const WalletRadio = ({ icon, label, id, name }: any) => {
    return (
        <label className="flex justify-between items-center w-96 p-4 border border-default-20 rounded-[4px] cursor-pointer bg-white">
            <div className="flex items-center gap-4">
                {icon}
                <p className="text-xl leading-tight font-medium text-default-100">{label}</p>
            </div>
            <input className="h-5 w-5 border-default-20" type="radio" name={name} id={id} />
        </label>
    );
};

export default WalletRadio;
