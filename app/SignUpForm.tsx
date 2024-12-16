'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import validator from 'email-validator';
import { cn, ValidationRule, validate } from '@/lib/utils';

export interface SignUpFormProps {
    text: {
        cta: string;
        ctasuccess: string;
        email: {
            placeholder: string;
            error: string;
        },
        password: {
            placeholder: string;
        }
    }
    validationRules: {
        password: ValidationRule[];
    };

    onSignUp: (data: { email: string; password: string }) => Promise<void>;
}

type InputValidationState = 'initial' | 'valid' | 'error';

export default function SignUpForm({ text, validationRules, onSignUp }: SignUpFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailInputState, setEmailInputState] = useState<InputValidationState>('initial');
    const [passwordInputState, setPasswordInputState] = useState<InputValidationState>('initial');

    const [requestSent, setRequestSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const passwordErrors = validate(validationRules.password, password);
        const emailValid = validator.validate(email);

        if (!emailValid) {
            setEmailInputState('error');
        }

        if (passwordErrors.length) {
            setPasswordInputState('error');
        }

        if (emailValid && !passwordErrors.length) {
            try {
                setRequestSent(true)
                await onSignUp({ email, password });
            } catch (error) {
                //Should be handled according to design (missing)
                alert(error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5 z-1 relative">
            <div className="space-y-2">
                <Input
                    id="email"
                    placeholder={text.email.placeholder}
                    disabled={requestSent}
                    maxLength={256}
                    value={email}
                    onBlur={() => {
                        const emailValid = validator.validate(email);
                        setEmailInputState(emailValid ? 'valid' : 'error');
                    }}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailInputState('initial');
                    }}
                    validationState={emailInputState}
                    className="w-full"
                />
                {emailInputState === 'error' && (
                    <p className="ml-5 text-xs text-error flex items-center gap-1 mt-1">
                        {text.email.error}
                    </p>
                )}
            </div>
            <div className={emailInputState === 'error' ? 'space-y-2' : 'space-y-5'}>
                <Input
                    id="password"
                    type="password"
                    placeholder={text.password.placeholder}
                    disabled={requestSent}
                    maxLength={64}
                    onBlur={() => {
                        const passwordErrors = validate(validationRules.password, password);
                        setPasswordInputState(passwordErrors.length ? 'error' : 'valid');
                    }}
                    value={password}
                    onChange={(e) => {
                        e.target.dataset.validation = ''
                        setPassword(e.target.value);
                        setPasswordInputState('initial');
                    }}
                    validationState={passwordInputState}
                    className="w-full"
                />
                <div className="mt-1 ml-5 space-y-1">
                    {validationRules.password.map((rule, index) => {
                        const isMet = new RegExp(rule.regex).test(password);
                        const showError = passwordInputState === 'error' && !isMet;
                        return (
                            <div
                                key={index}
                                className={`flex items-center gap-1 text-xs ${isMet ? 'text-success' : showError ? 'text-error' : 'text-ink'}`}
                            >
                                {rule.label}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className='flex pt-4'>
                <Button type="submit" disabled={requestSent} className={cn('mx-auto', { 'to-success': requestSent })}>{requestSent ? text.ctasuccess : text.cta}</Button>
            </div>
        </form>
    );
}