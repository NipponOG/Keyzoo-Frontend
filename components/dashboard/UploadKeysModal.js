import { useMemo, useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";

export default function UploadKeysModal({
    product,
    onClose,
    onUpload,
}) {

    const [text, setText] = useState("");

    const keys = useMemo(() => {

        return text
            .split("\n")
            .map(k => k.trim())
            .filter(Boolean);

    }, [text]);

    return (

        <div className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">

            <div className="w-full max-w-3xl rounded-2xl border border-[#2b2b2b] bg-[#171717] shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b border-[#2b2b2b] px-6 py-5">

                    <div>

                        <h2 className="text-xl font-semibold text-white">
                            Upload Product Keys
                        </h2>

                        <p className="text-sm text-gray-400 mt-1">
                            Paste one key per line.
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="h-10 w-10 rounded-lg hover:bg-white/10 flex items-center justify-center text-gray-400"
                    >
                        <FiX size={20} />
                    </button>

                </div>

                {/* Product */}

                <div className="px-6 pt-6">

                    <div className="rounded-xl border border-[#2b2b2b] bg-[#1b1b1b] p-5">

                        <p className="text-gray-400 text-sm">
                            Selected Product
                        </p>

                        <h3 className="mt-2 text-lg font-semibold text-white">
                            {product.title}
                        </h3>

                        <div className="mt-4 flex flex-wrap gap-2">

                            <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs text-blue-400 uppercase">
                                {product.region || product.card_region}
                            </span>

                            <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs text-green-400 uppercase">
                                {product.workPlatform}
                            </span>

                            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">
                                {product.item}
                            </span>

                        </div>

                    </div>

                </div>

                {/* Textarea */}

                <div className="px-6 py-6">

                    <label className="block text-sm font-medium text-gray-300 mb-3">

                        Paste Keys

                    </label>

                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder={`AAAAA-BBBBB-CCCCC-DDDDD

AAAAA-BBBBB-CCCCC-DDDDD

AAAAA-BBBBB-CCCCC-DDDDD`}
                        className="w-full h-[350px] rounded-xl border border-[#2b2b2b] bg-[#111111] p-4 font-mono text-sm text-white outline-none focus:border-indigo-500 resize-none"
                    />

                </div>

                {/* Footer */}

                <div className="border-t border-[#2b2b2b] px-6 py-5">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-gray-400">
                                Keys Detected
                            </p>

                            <h3 className="text-2xl font-bold text-green-400">

                                {keys.length}

                            </h3>

                        </div>

                        <div className="flex gap-3">

                            <button
                                onClick={onClose}
                                className="rounded-lg bg-[#2b2b2b] px-6 py-3 text-white hover:bg-[#353535]"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => onUpload(keys)}
                                disabled={!keys.length}
                                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-500 disabled:opacity-40"
                            >
                                <FiUpload />

                                Upload {keys.length || ""} Keys

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}