// icons
import Document from '../../icons/Document';
import Data from '../../icons/Data';
import Video from '../../icons/Video';
import Slides from '../../icons/Slides';
import Code from '../../icons/Code';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Textarea from '../../components/Textarea';

const Upload = () => {
    return (
        <div className="min-h-screen w-full py-20 bg-background-grey">
            <div className="w-[400px] mx-auto mt-10">
                <h1 className="text-default-100 text-4xl font-medium mb-12">You can upload your research object!</h1>
                <h2 className="text-default-70 text-2xl font-semibold mb-6">Research Object Info</h2>
                <div className="grid grid-cols-1 grid-flow-row gap-5 mb-12">
                    <InputGroup label={'Research Object Name'}>
                        <Input type="text" name="title" placeholder="Name - e.g: A comprehensive Study..." />
                    </InputGroup>
                    <InputGroup label={'Author Name'}>
                        <Input type="text" name="title" placeholder="Author name(s)" />
                    </InputGroup>
                    <InputGroup label={'Date'}>
                        <Input type="text" name="title" placeholder="Date" />
                    </InputGroup>
                    <InputGroup label={'DOI'}>
                        <Input type="text" name="title" placeholder="DOI" />
                    </InputGroup>
                    <InputGroup label={'Abstract'}>
                        <Textarea name="abstract" placeholder="Enter an abstract" />
                    </InputGroup>
                    <RadioGroup label={'State'}>
                        <Radio label={'Reviewed'} name={'type'} value={'reviewed'} />
                        <Radio label={'Pending'} name={'type'} value={'pending'} />
                    </RadioGroup>
                    <RadioGroup label={'Access'}>
                        <Radio label={'Free'} name={'type'} value={'free'} />
                        <Radio label={'Premium'} name={'type'} value={'premium'} />
                    </RadioGroup>
                </div>

                <h2 className="text-default-70 text-2xl font-semibold mb-6">Upload Research Object</h2>
                <p className="text-lg font-medium text-default-100 mb-4">Choose file type</p>
                <div className="flex gap-2 mb-4">
                    <Document className="" />
                    <Data />
                    <Video />
                    <Slides />
                    <Code />
                </div>
                <div className="flex items-center justify-center w-full mb-16">
                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center bg-default-0 border border-default-30 rounded-lg w-full h-32 cursor-pointer border-dashed"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span>
                            </p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                    </label>
                </div>
                <div className="flex gap-3 justify-between">
                    <Button variant="light" onClick={() => {}}>
                        Mint NFT
                    </Button>
                    <Button variant="blue" onClick={() => {}}>
                        Publish on Publed
                    </Button>
                </div>
            </div>
        </div>
    );
};

const Radio = ({ label, name, value }: any) => {
    return (
        <div className="flex items-center gap-3">
            <input className="form-ring text-dark-blue-60 bg-white" type="radio" name={name} id={value} value={value} />
            <label htmlFor={value} className="text-default-100">
                {label}
            </label>
        </div>
    );
};

const RadioGroup = ({ label, children }: any) => {
    console.log(children);
    return (
        <div className="flex flex-col gap-2">
            <span className="text-default-100 block font-medium text-lg mb-1">{label}</span>
            {children}
        </div>
    );
};

const InputGroup = ({ label, children }: any) => {
    return (
        <label className="block text-left">
            <span className="text-default-100 block font-medium text-lg mb-3">{label}</span>
            {children}
        </label>
    );
};

export default Upload;
