import Star from '@/components/ui/star';
import SignUpForm from './SignUpForm';
import { redirect } from 'next/navigation';

export default async function SignUpPage() {
    return (
        <div className="flex min-h-screen justify-center bg-gradient-to-b from-greyStart to-greyStop p-[30px]">
            <div className="w-full max-w-md text-ink relative mt-[10vh]">
                <Star size={14} className='absolute top-[-73px] right-[26px]' />

                <div className='flex'>
                    <div className='relative inline-block mx-auto'>
                        <Star size={14} className='absolute top-[7px] left-[-21px]' />
                        <h1 className="text-2xl font-bold text-center mb-8 z-1 relative">Sign up</h1>
                    </div>
                </div>
                <div className='relative'>
                    <Star size={20} className='absolute top-[-43px] left-12' />
                    <Star size={27} className='absolute top-16 right-12' />
                    <Star size={27} className='absolute bottom-[-83px] left-16' />
                    <Star size={21} className='absolute bottom-[-112px] right-16' />
                    <Star size={14} className='absolute bottom-[-312px] left-10' />
                    <SignUpForm
                        text={{
                            cta: "Sign Up",
                            ctasuccess: 'Creating Your Account',
                            email: {
                                placeholder: "Type your email",
                                error: "Invalid email address",
                            },
                            password: {
                                placeholder: "Create your password"
                            }
                        }}
                        validationRules={{
                            password: [
                                {
                                    label: "8 characters or more (no spaces)",
                                    regex: "^(?=\\S*$).{8,}$"
                                },
                                {
                                    label: "Uppercase and lowercase letters",
                                    regex: "^(?=.*[a-z])(?=.*[A-Z])"
                                },
                                {
                                    label: "At least one digit",
                                    regex: "\\d"
                                }
                            ]
                        }}
                        onSignUp={async (data) => {
                            'use server';
                            // Validate user 
                            // Hash password
                            // Store to db
                            // Or use authorization service
                            console.log(data);
                            redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
                        }}
                    />
                </div>
            </div>
        </div>
    );
}