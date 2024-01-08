{
    token ? (
        <div style={{ height: 'calc(100vh - 220px)' }} className='mr-[40px] mt-[40px]    '>
            {dataMateri !== null ? (
                <div className='w-max rounded-[28px] bg-white px-[54px] py-[40px] drop-shadow'>
                    <h1 className='text-[20px] font-bold leading-[20px]'>Tambah Materi</h1>
                    <div className='flex gap-16'>
                        <form className='mt-[20px] flex flex-col gap-3' onSubmit={handleUpdateMateri}>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor=''>
                                    Nama Materi <span className='text-alert-1'>*</span>
                                </label>
                                <input
                                    type='text'
                                    className='w-full cursor-pointer appearance-none rounded-[10px]   bg-[#EDF3F3] py-1 font-monsterrat outline-none'
                                    onChange={(e) => setName(e.target.value)}
                                    defaultValue={dataMateri.name}
                                />
                            </div>
                            <div className='fladminCreateClassApi({ name, description, image });ex flex-col gap-1'>
                                <label htmlFor=''>
                                    Kelas <span className='text-alert-1'>*</span>
                                </label>
                                <select
                                    onChange={(e) => setIdKelas(e.target.value)}
                                    name=''
                                    id=''
                                    className='w-full cursor-pointer appearance-none rounded-[10px]   bg-[#EDF3F3] py-1 font-monsterrat outline-none'
                                    value={idKelas}>
                                    {classes.map((item) => (
                                        <option key={item.id_kelas} value={item.id_kelas}>
                                            {selectedClassName && item.id_kelas === dataMateri.id_kelas
                                                ? `${selectedClassName}`
                                                : item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor=''>
                                    Materi <span className='text-alert-1'>*</span>
                                </label>
                                <textarea
                                    name=''
                                    id=''
                                    cols='30'
                                    rows='5'
                                    className='border p-2'
                                    onChange={(e) => setMateri(e.target.value)}
                                    defaultValue={dataMateri.materi}></textarea>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor=''>
                                    URL <span className='text-alert-1'>*</span>
                                </label>
                                <input
                                    type='text'
                                    className='w-full cursor-pointer appearance-none rounded-[10px]   bg-[#EDF3F3] py-1 font-monsterrat outline-none'
                                    defaultValue={dataMateri.url}
                                    onChange={(e) => setURL(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor=''>
                                    Poin <span className='text-alert-1'>*</span>
                                </label>
                                <input
                                    type='text'
                                    className='w-full cursor-pointer appearance-none rounded-[10px]   bg-[#EDF3F3] py-1 font-monsterrat outline-none'
                                    defaultValue={dataMateri.poin}
                                    onChange={(e) => setPoin(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor=''>
                                    Durasi <span className='text-alert-1'>*</span>
                                </label>
                                <input
                                    type='integer'
                                    className='w-full cursor-pointer appearance-none rounded-[10px]   bg-[#EDF3F3] py-1 font-monsterrat outline-none'
                                    defaultValue={dataMateri.durasi}
                                    onChange={(e) => setDurasi(e.target.value)}
                                />
                            </div>

                            <button type='submit'>Submit</button>
                        </form>
                        <div>
                            <iframe
                                width='560'
                                height='315'
                                src={url}
                                title='YouTube video player'
                                // frameborder='0'
                                // allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                            ></iframe>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Data sedang dimuat</p>
            )}
        </div>
    ) : (
        <p>data sedang dimuat...</p>
    );
}
