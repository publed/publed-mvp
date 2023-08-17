// icons
import Document from '../../icons/Document';
import Data from '../../icons/Data';
import Video from '../../icons/Video';
import Slides from '../../icons/Slides';
import Code from '../../icons/Code';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

const Upload = () => {
    return (
        <div className="min-h-screen w-full py-20 bg-background-grey">
            <div className="w-[800px] mx-auto mt-10">
                <h1 className="text-default-100 text-4xl font-medium mb-12">Review Process</h1>
                <div className="grid grid-cols-1 grid-flow-row gap-5 mb-12">
                    <InputGroup label={'Strengths'}>
                        <Textarea name="abstract" placeholder="Enter strengths" />
                    </InputGroup>
                    <InputGroup label={'Weaknesses'}>
                        <Textarea name="weaknesses" placeholder="Enter weaknesses" />
                    </InputGroup>
                    <InputGroup label={'Observations'}>
                        <Textarea name="observations" placeholder="Enter observations" />
                    </InputGroup>
                    <InputGroup label={'State'} className="w-60">
                        <Select
                            options={[]}
                            placeholder="State"
                            selected="-1"
                            getOptionLabel={() => ''}
                            changeHandler={() => {}}
                        />
                    </InputGroup>
                </div>
                <div className="flex gap-3 justify-end">
                    <Button variant="light" onClick={() => {}}>
                        Mint NFT
                    </Button>
                    <Button variant="blue" onClick={() => {}}>
                        Submit Review
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

const InputGroup = ({ label, className, children }: any) => {
    return (
        <label className={`block text-left ${className}`}>
            <span className="text-default-100 block font-medium text-lg mb-3">{label}</span>
            {children}
        </label>
    );
};

export default Upload;
