// icons
import Document from '../../icons/Document';
import Data from '../../icons/Data';
import Video from '../../icons/Video';
import Slides from '../../icons/Slides';
import Code from '../../icons/Code';
import React, { useState } from 'react';
import Button from '../../components/Button';
import ResearchCard from '../../components/ResearchCard';
import Avatar from 'boring-avatars';
import { useWallet } from '@solana/wallet-adapter-react';
import { LinkedinLogo, TwitterLogo } from '../../assets';

const entries = [
    {
        user: 'John White',
        action: 'accepted',
    },
    {
        user: 'John Smith',
        action: 'rejected',
    },
    {
        user: 'John Jones',
        action: 'invited',
    },
];

const Research = () => {
    const wallet = useWallet();
    return (
        <div className="min-h-screen w-full py-20 bg-background-grey">
            <div className="container mx-auto mt-20">
                <div className="mb-20">
                    <div className="grid grid-cols-8 items-start gap-10">
                        <div className="col-span-3 bg-white p-7 rounded-lg shadow">
                            <div className="flex gap-6 mb-8">
                                <div className="h-28 w-28 rounded-full flex justify-center items-center">
                                    <Avatar
                                        name={wallet.publicKey?.toString()}
                                        variant="pixel"
                                        colors={['#26a653', '#2a1d8f', '#79646a', '#e9c46a', '#e76f51', '#264653']}
                                        size={112}
                                    />
                                </div>
                                <div className="flex-grow flex flex-col gap-3">
                                    <div className="flex items-baseline gap-1">
                                        <h2 className="text-2xl font-semibold text-dark-blue-80">Sandro E. Pinto</h2>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <RoleTag variant="blue">Author</RoleTag>
                                        <RoleTag variant="gray">Reviewer</RoleTag>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="small">Follow</Button>
                                        <TwitterLogo className="fill-default-60" />
                                        <LinkedinLogo className="fill-default-60" />
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-default-100 text-lg font-semibold mb-2">Abstract</h3>
                            <p className="text-default-100 text-sm text-justify mb-4">
                                Virtualization technology starts becoming more and more widespread in the embedded
                                space. The penalties incurred by standard software-based virtualization is pushing
                                research towards hardware-assisted solutions. Among the existing commercial
                                off-the-shelf technologies for secure virtualization, ARM TrustZone is attracting
                                particular attention. However, it is often seen with some skepticism due to the dual-OS
                                limitation of existing state-of-the-art solutions. This letter presents the
                                implementation of a TrustZone-based hypervisor for real-time embedded systems, which
                                allows multiple RTOS partitions on the same hardware platform. The results demonstrate
                                that virtualization overhead is less than 2 percent for a 10 milliseconds
                                guest-switching rate, and the system remains deterministic. This work goes beyond
                                related work by implementing a TrustZone-assisted solution that allows the execution of
                                an arbitrary number of guest OSes while providing the foundation to drive next
                                generation of secure virtualization solutions for resource-constrained embedded devices.
                            </p>
                            <div className="flex flex-wrap mb-6 gap-2">
                                <Tag>TrustZone</Tag>
                                <Tag>Embedded Virtualization</Tag>
                                <Tag>Security</Tag>
                                <Tag>RTOS</Tag>
                            </div>
                            <div className="flex gap-1 text-sm text-default-100">
                                <p className="font-bold">ORC ID</p>
                                <p className="">0000-0003-4580-7484</p>
                            </div>
                        </div>
                        <div className="col-span-5">
                            <Tabsx
                                chosen="docs"
                                renderNav={(selected: any) => (
                                    <div className="flex gap-2 mb-4">
                                        <NavItem id="docs">Work</NavItem>
                                        <NavItem id="reviews">Reviews</NavItem>
                                    </div>
                                )}
                                renderPanels={(selected: any) => (
                                    <div className="w-full">
                                        <Panel id="docs">
                                            <div className="flex flex-col gap-3">
                                                <div className="bg-white w-full rounded-lg shadow p-5">
                                                    <h2 className="text-lg text-dark-blue-80 font-medium mb-4">
                                                        BAO - A Lightweight Static Partitioning Hypervisor{' '}
                                                    </h2>
                                                    <p className="text-sm text-dark-blue-100 mb-2 text-ellipsis">
                                                        Given the increasingly complex and mixed-criticality nature of
                                                        modern embedded systems, virtualiz-ation emerges as a natural
                                                        solution to achieve strong spatial and temporal isolation.
                                                        Widely used hypervisors such as KVM and Xen were not designed
                                                        having embedded constraints and requirements in mind. The static
                                                        partitioning architecture pioneered by Jailhouse seems to
                                                        address embedded concerns. However, Jailhouse still depends on
                                                        Linux to boot and manage its VMs. In this paper, we present the
                                                        Bao hypervisor, a minimal, standalone and clean-slate
                                                        implementation of the static partitioning architecture for Armv8
                                                        and RISC-V platforms. Preliminary results regarding size, boot,
                                                        performance, and interrupt latency, show this approach incurs
                                                        only minimal virtualization overhead. Bao will soon be publicly
                                                        available, in hopes of engaging both industry and academia on
                                                        improving Baos safety, security, and real-time guarantees.
                                                    </p>
                                                    <p className="text-sm font-medium">Read More</p>
                                                </div>
                                                <div className="bg-white w-full rounded-lg shadow p-5">
                                                    <h2 className="text-lg text-dark-blue-80 font-medium mb-4">
                                                        Cartesi - Security Analysis{' '}
                                                    </h2>
                                                    <p className="text-sm text-dark-blue-100 mb-2">
                                                        Web3 technologies have attracted huge attention from both
                                                        academia and industry. Blockchain is one of the most disruptive
                                                        technologies used in Web3 and has been widely adopted. This
                                                        technology has advantages in terms of security, immutability,
                                                        and data privacy, thus making it fitted for a variety of use
                                                        cases. The concept of blockchain was initially introduced by the
                                                        Bitcoin cryptocurrency, but nowadays, it is used in wide
                                                        spectrum of domains and applications. Following the rise of
                                                        Bitcoin, another major milestone in technology was the emergence
                                                        of Ethereum, which unlocked numberless opportunities in the
                                                        field...
                                                    </p>
                                                    <p className="text-sm font-medium">Read More</p>
                                                </div>
                                            </div>
                                        </Panel>
                                        <Panel id="reviews">
                                            <div className="flex flex-col gap-3">
                                                <div className="bg-white w-full rounded-lg shadow p-5">
                                                    <h2 className="text-lg text-dark-blue-80 font-medium mb-4">
                                                        MCXplore: An automated framework for validating memory
                                                        controller designs{' '}
                                                    </h2>
                                                    <p className="text-sm text-dark-blue-100 mb-2 text-ellipsis">
                                                        This work presents an automated framework for the validation of
                                                        dynamic random access memory controllers (DRAM MCs) called
                                                        MCXplore. In developing this framework, we construct formal
                                                        models for memory requests interrelation and DRAM command
                                                        interaction. The framework enables validation engineers to
                                                        define their test plans precisely as temporal logic
                                                        specifications. We use the NuSMV model-checker to generate
                                                        counter-examples that serve as test templates; hence, MCXplore
                                                        uses these test templates to generate memory tests to validate
                                                        the correctness properties of the memory controller. We show the
                                                        effectiveness of MCXplore by validating various state-of-the-art
                                                        MC features as well as hard-to-detect timing violations that
                                                        often occur. ...
                                                    </p>
                                                    <p className="text-sm font-medium">Read More</p>
                                                </div>
                                            </div>
                                        </Panel>
                                    </div>
                                )}
                            />
                            {/* <h2 className="mb-4 text-default-100 text-xl font-semibold">Work / Reviews</h2> */}
                            {/* <div className="flex flex-col gap-3">
                                <div className="bg-white w-full rounded-lg shadow p-5">
                                    <h2 className="text-lg text-dark-blue-80 font-medium mb-4">
                                        CertiK: Building Fully Trustworthy Smart Contracts and Blockchain Ecosystems{' '}
                                    </h2>
                                    <p className="text-sm text-dark-blue-100 mb-2 text-ellipsis">
                                        Virtualization technology starts becoming more and more widespread in the
                                        embedded space. The penalties incurred by standard software-based virtualization
                                        is pushing research towards Virtualization technology starts becoming more and
                                        more widespread in the embedded space. The penalties incurred by standard
                                        software-based virtualization is pushing research towards Virtualization
                                        technology starts becoming more and more widespread in the embedded space. The
                                        penalties incurred by standard software-based virtualization ...
                                    </p>
                                    <p className="text-sm font-medium">Read More</p>
                                </div>
                                <div className="bg-white w-full rounded-lg shadow p-5">
                                    <h2 className="text-lg text-dark-blue-80 font-medium mb-4">
                                        CertiK: Building Fully Trustworthy Smart Contracts and Blockchain Ecosystems{' '}
                                    </h2>
                                    <p className="text-sm text-dark-blue-100 mb-2">
                                        Virtualization technology starts becoming more and more widespread in the
                                        embedded space. The penalties incurred by standard software-based virtualization
                                        is pushing research towards Virtualization technology starts becoming more and
                                        more widespread in the embedded space. The penalties incurred by standard
                                        software-based virtualization is pushing research towards Virtualization
                                        technology starts becoming more and more widespread in the embedded space. The
                                        penalties incurred by standard software-based virtualization ...
                                    </p>
                                    <p className="text-sm font-medium">Read More</p>
                                </div>
                                <div className="bg-white w-full rounded-lg shadow p-5">
                                    <h2 className="text-lg text-dark-blue-80 font-medium mb-4">
                                        CertiK: Building Fully Trustworthy Smart Contracts and Blockchain Ecosystems{' '}
                                    </h2>
                                    <p className="text-sm text-dark-blue-100 mb-2">
                                        Virtualization technology starts becoming more and more widespread in the
                                        embedded space. The penalties incurred by standard software-based virtualization
                                        is pushing research towards Virtualization technology starts becoming more and
                                        more widespread in the embedded space. The penalties incurred by standard
                                        software-based virtualization is pushing research towards Virtualization
                                        technology starts becoming more and more widespread in the embedded space. The
                                        penalties incurred by standard software-based virtualization ...
                                    </p>
                                    <p className="text-sm font-medium">Read More</p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const tabsContext = React.createContext<[any, Function] | null>(null);

const useData = () => {
    const context = React.useContext(tabsContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

const Tabsx = ({ chosen, renderNav, renderPanels }: any) => {
    const [selected, setSelected] = useState(chosen);

    return (
        <tabsContext.Provider value={[selected, setSelected]}>
            <div className="flex flex-col gap-4">
                <ul className="flex gap-4">{renderNav(selected)}</ul>
                <ul>{renderPanels(selected)}</ul>
            </div>
        </tabsContext.Provider>
    );
};

const NavItem = ({ id, children }: any) => {
    const [selected, setSelected] = useData();

    return (
        <li
            className={`flex gap-[6px] px-5 py-[10px] border rounded-full cursor-pointer ${
                selected == id
                    ? 'bg-regular-blue-70 text-default-0 fill-default-0'
                    : 'bg-white text-default-70 stroke-default-70 fill-none px-[10px]'
            }`}
            onClick={() => setSelected(id)}
        >
            {children}
        </li>
    );
};

interface RoleTagProps {
    variant: 'blue' | 'gray';
    children: React.ReactNode;
}

const RoleTag = ({ variant, children }: RoleTagProps) => {
    const variants = {
        blue: 'bg-regular-blue-30 text-default-100',
        gray: 'bg-dark-blue-30 text-default-100',
    };

    return <div className={`rounded px-[10px] py-[2px] text-sm ${variants[variant]}`}>{children}</div>;
};

const Panel = ({ id, children }: any) => {
    const [selected, setSelected] = useData();

    return <li className={selected == id ? 'block' : 'hidden'}>{children}</li>;
};

const Tag = ({ children }: any) => {
    return <div className="bg-dark-blue-20 rounded-full py-1 px-[14px] text-sm text-default-100">{children}</div>;
};

const Card = ({}) => {
    return (
        <div className="bg-white p-5 flex flex-col items-center rounded-lg shadow">
            <div className="flex gap-3 mb-3 justify-center">
                <h3 className="text-dark-blue-60 text-2xl font-semibold whitespace-nowrap">John White</h3>
                <p className="text-system-success text-xl font-bold"> 4.8</p>
            </div>
            <div className="flex flex-wrap mb-8 gap-2 min-w-[280px]">
                <Tag>Blockchain</Tag>
                <Tag>Security</Tag>
                <Tag>Smart Contracts</Tag>
            </div>
            <div className="rounded-full py-2 px-4 bg-system-success/30 text-default-100 text-sm">Accepted</div>
        </div>
    );
};

const ReviewerCard = ({ name, rating, review }: any) => {
    return (
        <div className="flex flex-col border border-default-10 rounded-lg bg-white p-5">
            <div className="flex gap-3 mb-3">
                <p className="text-dark-blue-60 text-xl font-medium">{name}</p>
                <p className="text-system-success text-xl font-bold">{rating}</p>
            </div>
            <div className="flex flex-col gap-[2px] mb-6">
                <div className="flex gap-3 items-baseline">
                    <p className="text-default-50">Availability:</p>
                    <div className="h-3 w-3 rounded-full bg-system-warning ring-4 ring-system-warning/30" />
                </div>
                <div className="flex gap-2 items-baseline">
                    <p className="text-default-50">Reviews:</p>
                    <p className="font-bold">12</p>
                </div>
                <div className="flex gap-2 items-baseline">
                    <p className="text-default-50">Acceptance Rate:</p>
                    <p className="text-system-error font-bold">27%</p>
                </div>
            </div>
            <div className="flex flex-wrap mb-8 gap-2 min-w-[280px]">
                <Tag>Blockchain</Tag>
                <Tag>Security</Tag>
                <Tag>Smart Contracts</Tag>
            </div>
            <Button variant="light">Choose</Button>
        </div>
    );
};

const Pill = ({ isActive, children }: any) => {
    return (
        <div
            className={`rounded-full px-5 py-[10px] inline-flex border border-dark-blue-30 uppercase bg-white font-medium text-default-70 gap-[10px] ${
                isActive ? 'bg-[#0088A9] text-red-600' : ''
            }`}
        >
            {children}
        </div>
    );
};

export default Research;
