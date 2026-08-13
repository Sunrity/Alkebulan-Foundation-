import React from "react";
import { Copy, CheckCircle, Landmark } from "lucide-react";
import { toast } from "react-hot-toast";

const AccountDetails = () => {
    const accountNumber = "510 5290 759";

    const copyAccountNumber = async () => {
        try {
            await navigator.clipboard.writeText(accountNumber);
            toast.success("Account number copied!");
        } catch (error) {
            toast.error("Unable to copy account number.");
        }
    };

    return (
        <div className="relative overflow-hidden rounded-2xl bg-[#0B132B] text-white shadow-xl p-6 md:p-8">
            
            {/* Decorative Circle */}
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-blue-600/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-20 -left-16 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl" />

            <div className="relative z-10">

                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                        <Landmark
                            size={24}
                            className="text-blue-300"
                        />
                    </div>

                    <div>
                        <p className="text-blue-300 text-sm font-semibold uppercase tracking-wider">
                            Support Our Mission
                        </p>

                        <h2 className="text-xl md:text-2xl font-bold mt-1">
                            Make a Difference
                        </h2>
                    </div>
                </div>

                {/* Description */}
                <p className="text-white/70 text-sm md:text-base leading-7 mb-7">
                    Your support helps Alkebulan Foundation empower young
                    people through leadership, digital skills, mentorship,
                    personal development, and meaningful opportunities.
                </p>

                {/* Account Details */}
                <div className="space-y-4">

                    {/* Bank */}
                    <div className="rounded-xl bg-white/10 border border-white/10 p-4">
                        <p className="text-xs uppercase tracking-wider text-white/40 mb-1">
                            Bank
                        </p>

                        <p className="font-semibold text-white">
                            Moniepoint
                        </p>
                    </div>

                    {/* Account Name */}
                    <div className="rounded-xl bg-white/10 border border-white/10 p-4">
                        <p className="text-xs uppercase tracking-wider text-white/40 mb-1">
                            Account Name
                        </p>

                        <p className="font-semibold text-white leading-6">
                            Alkebulan Foundation For Skill Development
                        </p>
                    </div>

                    {/* Account Number */}
                    <div className="rounded-xl bg-white/10 border border-white/10 p-4">
                        <p className="text-xs uppercase tracking-wider text-white/40 mb-1">
                            Account Number
                        </p>

                        <div className="flex items-center justify-between gap-3">
                            <p className="text-xl md:text-2xl font-bold tracking-wider text-white">
                                {accountNumber}
                            </p>

                            <button
                                type="button"
                                onClick={copyAccountNumber}
                                className="shrink-0 w-10 h-10 rounded-lg bg-white text-[#0B132B] flex items-center justify-center hover:bg-blue-100 transition"
                                aria-label="Copy account number"
                            >
                                <Copy size={17} />
                            </button>
                        </div>
                    </div>

                </div>

                {/* Footer Message */}
                <div className="mt-6 flex items-start gap-3">
                    <CheckCircle
                        size={18}
                        className="text-blue-300 mt-0.5 shrink-0"
                    />

                    <p className="text-xs md:text-sm text-white/50 leading-6">
                        Every contribution helps us create opportunities
                        and build a stronger generation of young leaders.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default AccountDetails;

