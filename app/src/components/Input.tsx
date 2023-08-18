interface InputI {
    type:
        | 'text'
        | 'password'
        | 'email'
        | 'number'
        | 'date'
        | 'time'
        | 'datetime-local'
        | 'month'
        | 'week'
        | 'url'
        | 'tel'
        | 'search'
        | 'color';
    name: string;
    placeholder: string;
    value?: string;
    changeHandler?: (evt: any) => void;
}

export const Input = ({ type, name, placeholder, value = '', changeHandler }: InputI) => {
    return (
        <input
            type={type}
            name={name}
            id={name}
            defaultValue={value}
            placeholder={placeholder}
            onChange={changeHandler}
            className="w-full py-[10px] px-[14px] rounded-lg border border-default-30 bg-white text-default-100 focus:border-regular-blue-30 form-ring disabled:opacity-50"
        />
    );
};

export default Input;
