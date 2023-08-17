interface TextareaI {
    name: string;
    placeholder: string;
    value?: string;
    changeHandler?: (evt: any) => void;
}

const Textarea = ({ name, placeholder, value = '', changeHandler }: TextareaI) => {
    return (
        <textarea
            name={name}
            id={name}
            placeholder={placeholder}
            defaultValue={value}
            onChange={changeHandler}
            className="w-full min-h-[128px] overflow-y-scroll resize-none px-[10px] py-[14px] rounded-lg border border-default-30 bg-white text-default-100 focus:border-regular-blue-30 form-ring disabled:opacity-50"
        />
    );
};

export default Textarea;
