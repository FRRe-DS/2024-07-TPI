import React, { ReactNode } from 'react';

interface AdditionalElementProps {
    showPassword?: boolean;
    togglePasswordVisibility?: () => void;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    additionalElement?: React.FC<AdditionalElementProps>; 
    showPassword?: boolean; 
    togglePasswordVisibility?: () => void; 
}

const Input: React.FC<InputProps> = ({
    label,
    id,
    additionalElement: AdditionalElement,
    showPassword,
    togglePasswordVisibility,
    ...rest
}) => {
    return (
        <>
            <label htmlFor={id} className="block text-sm font-medium text-emerald-800">
                {label}
            </label>
            <div className="mt-1 relative">
            <input
                id={id} 
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...rest}
            />
            {AdditionalElement && (
                <AdditionalElement
                    showPassword={showPassword} 
                    togglePasswordVisibility={togglePasswordVisibility || (() => {})} 
                />
            )}
            </div>
        </>
    );
};

export default Input;
