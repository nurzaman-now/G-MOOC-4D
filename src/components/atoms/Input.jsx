//core
import PropTypes from 'prop-types';

const Input = ({
    id,
    className = 'bg-neutral-6  border-net-2 px-6 py-[17px] text-body-2 font-normal focus:border-primary-1 ',
    type = 'text',
    placeholder = 'Your placeholder',
    ...props
}) => {
    return (
        <input
            {...props}
            id={id}
            type={type}
            placeholder={placeholder}
            className={`${className}  w-full cursor-pointer  appearance-none border-2 font-monsterrat outline-none`}
        />
    );
};

Input.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
};

export default Input;
