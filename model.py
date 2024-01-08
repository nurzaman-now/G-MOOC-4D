import os
import tensorflow as tf
import tensorflow_hub as hub
import joblib
import pandas as pd
import numpy as np
import re
import nltk

nltk.download("stopwords")
from nltk.corpus import stopwords
from Sastrawi.Stemmer.StemmerFactory import StemmerFactory

BASE_PATH = os.getcwd()
MODULE_PATH = os.path.join(
    BASE_PATH, "fastext_module"
)  # ekstrak file fastext_module.zip
DATA_MASTER_PATH = os.path.join(BASE_PATH, "data_text", "data_master.pkl")
KEY_NORM_PATH = os.path.join(BASE_PATH, "data_text", "key_norm.csv")

import os

if os.path.exists(DATA_MASTER_PATH):
    print(f"File {DATA_MASTER_PATH} ditemukan.")
else:
    print(f"File {DATA_MASTER_PATH} tidak ditemukan.")

special_stemming_rules = {
    "a": "alpha",
    "b": "beta",
    "c": "celotehan",
    "jawab": "pilih",
    "di mana": "dimana",
    "dimana": "mana",
    "home": "beranda",
    "awal": "beranda",
    "utama": "beranda",
    "depan": "beranda",
    "course": "kelas",
    "raport": "rapor",
    "rapot": "rapor",
    "leaderboard": "peringkat",
    "load ulang": "refresh",
    "perbarui": "refresh",
    "muat ulang": "refresh",
    "reload": "refresh",
    "segarkan": "refresh",
    "merefresh": "refresh",
    # tambahkan aturan khusus lainnya di sini jika diperlukan
}

factory = StemmerFactory()
stemmer = factory.create_stemmer()

data_master = joblib.load(DATA_MASTER_PATH)
key_norm = pd.read_csv(KEY_NORM_PATH)

model = hub.KerasLayer(MODULE_PATH, trainable=False)
# Load the saved model
# model = tf.keras.models.load_model(MODEL_PATH, custom_objects={'KerasLayer': hub.KerasLayer})


def casefolding(text):
    text = text.lower()
    text = re.sub(r"https?://\S+|www\.\S+", "", text)
    text = re.sub(r"[-+]?[0-9]+", "", text)
    text = re.sub(r"[^\w\s]", "", text)
    text = text.strip()
    return text


def text_normalize(text):
    # Mengganti kata-kata sesuai dengan aturan khusus
    text = " ".join([special_stemming_rules.get(word, word) for word in text.split()])

    # Mengganti singkatan
    text = " ".join(
        [
            key_norm[key_norm["singkat"] == word]["hasil"].values[0]
            if (key_norm["singkat"] == word).any()
            else word
            for word in text.split()
        ]
    )

    # Mengonversi ke huruf kecil
    text = str.lower(text)

    return text


stopwords_ind = set(stopwords.words("indonesian"))

# Kata-kata yang ingin dikecualikan
exceptions = [
    "mana",
    "akhir",
    "mulai",
    "lanjut",
    "ikut",
    "soal",
    "tanya",
    "tunjuk",
    "sebut",
    "jelas",
]

# Menghapus kata-kata tersebut dari daftar stopwords
stopwords_ind = [word for word in stopwords_ind if word not in exceptions]

# Menambahkan stopwords tambahan jika diperlukan
more_stopwords = ["ya"]
stopwords_ind += more_stopwords


def remove_stop_words(text):
    clean_words = []
    text = text.split()
    for word in text:
        if word not in stopwords_ind:
            clean_words.append(word)
    return " ".join(clean_words)


def stemming(text):
    text = stemmer.stem(text)
    return text


def text_preprocessing_process(text):
    text = casefolding(text)
    print("case: ", text)
    text = text_normalize(text)
    print("norm: ", text)
    text = stemming(text)
    print("stem: ", text)
    text = remove_stop_words(text)
    print("remove: ", text)
    return text


def match_data(kalimat):
    teks_after_preprocessing = text_preprocessing_process(kalimat)

    new_embedding = model([teks_after_preprocessing])
    new_embedding = np.array(new_embedding, dtype=float).flatten()

    data_embeddings = data_master["embeddings"]
    norms_a = np.linalg.norm(new_embedding)
    norms_b = np.linalg.norm(data_embeddings, axis=1)

    # Check for zero norm
    if norms_a == 0 or np.any(norms_b == 0):
        # Handle the case where a norm is zero to avoid division by zero
        return "perintah tidak terdaftar", 0.0
    else:
        # Use try-except to catch the warning and print the indices causing it
        try:
            cosine_similarities = np.dot(data_embeddings, new_embedding) / (
                norms_a * norms_b
            )
        except RuntimeWarning as e:
            print("Warning:", e)
            # Get the indices causing the warning
            invalid_indices = np.where(norms_b == 0)[0]
            print("Invalid indices:", invalid_indices)

        nearest_index = np.argmax(cosine_similarities)
        print(nearest_index)

        nearest_label = data_master["labels"][nearest_index]
        max_similarity = cosine_similarities[nearest_index]

        if max_similarity < 0.89:
            print("max_similarity:", max_similarity)
            nearest_label = "perintah tidak terdaftar"
        else:
            nearest_label = data_master["labels"][nearest_index]

        return nearest_label, max_similarity


# # Input nama gambar
# input_text = input(str('Kalimat apa saja bebas: '))

# label,score = match_data(input_text)

# print('label:', label,
#       '\nscore: ',score)
