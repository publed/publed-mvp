interface SelectI {
    options: any[];
    getOptionLabel: (option: any) => string;
    changeHandler: (evt: any) => any;
    selected: string;
    placeholder?: string;
}

const Select = ({ options, getOptionLabel, changeHandler, selected, placeholder }: SelectI) => {
    return (
        <select
            className="w-full font-sans bg-white border border-gray-300 py-[10px] px-[14px] rounded-lg text-gray-700 form-ring disabled:opacity-50"
            name="type"
            defaultValue={selected}
            onChange={(evt) => changeHandler(options[Number(evt.target.value)])}
        >
            {placeholder && (
                <option value={selected} disabled>
                    {placeholder}
                </option>
            )}
            {options.map((option, index) => (
                <option value={index} key={index}>
                    {getOptionLabel(option)}
                </option>
            ))}
        </select>
    );
};

export default Select;
