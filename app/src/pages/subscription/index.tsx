// icons
import Document from '../../icons/Document';
import Data from '../../icons/Data';
import Video from '../../icons/Video';
import Slides from '../../icons/Slides';
import Code from '../../icons/Code';
import Done from '../../icons/Done';
import React, { useState } from 'react';
import Button from '../../components/Button';
import ResearchCard from '../../components/ResearchCard';

const Subscription = () => {
    return (
        <div className="min-h-screen w-full py-20 bg-background-grey">
            <div className="container mx-auto mt-20">
                <div className="mb-20">
                    <h1 className="mb-10 text-center text-default-100 text-3xl font-semibold">Subscription Plans</h1>
                    <div className="flex justify-center gap-8">
                        <Card title="Free Plan" price="0 SOL" items={['Publish', 'Access free Research Objects']} />
                        <Card
                            title="Premium Plan"
                            price="10 SOL"
                            items={['Publish', 'Access free Research Objects']}
                            boldItems={['Access premium Research Objects']}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Card = ({ title, price, items, boldItems }: any) => {
    return (
        <div className="bg-white rounded-lg py-10 px-8 h-[420px] w-96 flex flex-col shadow-lg">
            <h1 className="text-default-100 font-medium text-xl mb-2 text-center">{title}</h1>
            <div className="flex justify-center items-baseline gap-1">
                {boldItems && <p className="text-sm font-semibold text-default-60">starting at</p>}
                <h2 className="text-default-100 font-semibold text-5xl mb-8 text-center">{price}</h2>
            </div>
            <ul className="flex-grow flex flex-col gap-4">
                {items.map((item: any) => (
                    <li key={item} className="flex gap-3">
                        <div className="bg-system-success/10 p-1 rounded-full">
                            <Done className="fill-system-success" />
                        </div>
                        <p className="text-default-50 text-base">{item}</p>
                    </li>
                ))}
                {boldItems?.map((item: any) => (
                    <li key={item} className="flex gap-3">
                        <div className="bg-system-success/10 p-1 rounded-full">
                            <Done className="fill-system-success" />
                        </div>
                        <p className="text-default-50 text-base font-bold">{item}</p>
                    </li>
                ))}
            </ul>
            <div className="flex justify-center">
                <Button variant="blue" className="w-full">
                    Get Started
                </Button>
            </div>
        </div>
    );
};

export default Subscription;
