// icons
import Document from '../../icons/Document';
import Data from '../../icons/Data';
import Video from '../../icons/Video';
import Slides from '../../icons/Slides';
import Code from '../../icons/Code';
import { useParams } from 'react-router-dom';
import { MetaplexContext } from '../../context/MetaplexContext';
import { useContext, useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { JsonMetadata } from '@metaplex-foundation/js';
import Button from '../../components/Button';

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
    return (
        <div className="min-h-screen w-full py-20 bg-background-grey">
            <div className="container mx-auto mt-20">
                <div className="mb-20">
                    <h1 className="mb-8 text-default-100 text-4xl font-medium text-center">Reviewer Assignment</h1>
                    <div className="grid grid-cols-4 gap-10">
                        <div className="col-span-3 bg-default-0 p-7 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-2 text-dark-blue-80">
                                CertiK: Building Fully Trustworthy Smart Contracts and Blockchain Ecosystems
                            </h2>
                            <p className="font-medium text-lg text-dark-blue-60 mb-4">CertiK</p>
                            <p className="text-sm text-default-100 mb-8">
                                <strong>DOI</strong> N/A
                            </p>
                            <p className="text-sm text-default-100 mb-4">
                                <strong>Submission</strong> 18/08/2023
                            </p>
                            <div className="flex mb-8 gap-2">
                                <Tag>*keywords*</Tag>
                                <Tag>Blockchain</Tag>
                                <Tag>Security</Tag>
                                <Tag>Smart Contracts</Tag>
                            </div>
                            <h3 className="text-default-100 text-lg font-semibold mb-2">Abstract</h3>
                            <p className="text-default-100 text-sm text-justify">
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
                        </div>
                        <div className="col-span-1 bg-default-0 p-7 rounded-lg">
                            <h2 className="mb-7 text-default-100 text-3xl font-semibold">Activity</h2>
                            {entries.map(({ user, action }) => (
                                <p className="text-default-50">
                                    <strong className="font-medium text-dark-blue-60">{user}</strong>{' '}
                                    <span className="text-system-success">{action}</span> reviewer{' '}
                                    <span className="text-sm text-default-40 whitespace-nowrap">2h ago</span>
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mb-20">
                    <h2 className="mb-8 text-default-100 text-3xl font-semibold text-center">Selected Reviewers</h2>
                    <div className="flex overflow-x-scroll gap-5 py-4 px-2 shadow-inner">
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </div>
                <div className=" mb-20">
                    <h1 className="mb-8 text-default-100 text-3xl font-semibold text-center">Reviewers Pool</h1>
                    <div className="grid grid-flow-row grid-cols-4 gap-5">
                        <ReviewerCard name="John White" rating="2.5" />
                        <ReviewerCard name="John White" rating="2.5" />
                        <ReviewerCard name="John White" rating="2.5" />
                        <ReviewerCard name="John White" rating="2.5" />
                        <ReviewerCard name="John White" rating="2.5" />
                        <ReviewerCard name="John White" rating="2.5" />
                        <ReviewerCard name="John White" rating="2.5" />
                    </div>
                </div>
            </div>
        </div>
    );
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
                    <Availability variant="busy" />
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

interface AvailabilityProps {
    variant: 'available' | 'busy' | 'unavailable';
}

const Availability = ({ variant }: AvailabilityProps) => {
    const variants = {
        available: 'bg-system-success bg-system-success/30',
        busy: 'bg-system-warning bg-system-warning/30',
        unavailable: 'bg-system-error bg-system-error/30',
    };
    return <div className={`h-3 w-3 rounded-full ring-4 ${variants[variant]}`} />;
};

export default Research;
