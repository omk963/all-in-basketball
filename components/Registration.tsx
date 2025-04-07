'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Jersey, Player } from "@/types";
import { playerSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { registerPlayer } from "@/lib/actions/register";
import { getAvailableNumbers } from "@/lib/actions/jersey";
import { useSession } from "next-auth/react";

interface Props extends Partial<Player> {
    type?: 'create' | 'update'
}

const Registration = ({ type, ...user }: Props) => {
    const router = useRouter();
    const [hasTeam, setHasTeam] = useState('');
    const [isCaptain, setIsCaptain] = useState('');
    const [wantFreeAgents, setWantFreeAgents] = useState('');
    const [borrowJersey, setBorrowJersey] = useState('');
    const [availableJerseys, setAvailableJerseys] = useState<Jersey[]>([]);

    const form = useForm<z.infer<typeof playerSchema>>({
        resolver: zodResolver(playerSchema),
        defaultValues: {
            height: '',
            captain: false,
            teamName: '', // Only used if captain is 'yes'
            yearsOfExperience: 0,
            color: '',
            size: '',
        }
    });

    const selectedSize = form.watch('size');

    useEffect(() => {
        const fetchAvailableNumbers = async () => {
            const available = await getAvailableNumbers(selectedSize);
            setAvailableJerseys(available);
        }

        if (selectedSize) {
            fetchAvailableNumbers();
            console.log(availableJerseys)
        }
    }, [selectedSize]);

    const onSubmit = async (values: z.infer<typeof playerSchema>) => {
        const { data: session } = useSession();
        const userId = session?.user?.id;

        if (!userId) {
            return;
        }

        const playerData = {
            ...values,
            userId,
        };

        const res = await registerPlayer(playerData);

        if (res.success) {
            toast.success('Registration successful');
            router.push(`/dashboard`);
        } else {
            console.log(res)
            toast.error(res.message as string);
        };
    };

    const TeamColor = () => {
        return (
            <>
                <FormField
                    control={form.control}
                    name={'color'}
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-1'>
                            <FormLabel className="font-normal text-xl">
                                Which color team are you?
                            </FormLabel>
                            <FormControl>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className='bg-white w-full'>
                                        <SelectValue placeholder='Color' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='RED'>Red</SelectItem>
                                        <SelectItem value='ORANGE'>Orange</SelectItem>
                                        <SelectItem value='GOLD'>Gold</SelectItem>
                                        <SelectItem value='BLACK'>Black</SelectItem>
                                        <SelectItem value='WHITE'>White</SelectItem>
                                        <SelectItem value='GREEN'>Green</SelectItem>
                                        <SelectItem value='ROYAL-BLUE'>Royal Blue</SelectItem>
                                        <SelectItem value='LIGHT-BLUE'>Light Blue</SelectItem>
                                        <SelectItem value='PURPLE'>Purple</SelectItem>
                                        <SelectItem value='PINK'>Pink</SelectItem>
                                        <SelectItem value='PRACTICE-RED'>Practice-Red</SelectItem>
                                        <SelectItem value='PRACTICE-BLUE'>Practice-Blue</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {isCaptain === 'yes' && (
                    <FormField
                        control={form.control}
                        name={'teamName'}
                        render={({ field }) => (
                            <FormItem className='flex flex-col gap-1'>
                                <FormLabel className="font-normal text-xl">
                                    What is the name of your team?
                                </FormLabel>
                                <FormControl>
                                    <Input required placeholder='Team Name' {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <p>Would you like to borrow a jersey?</p>
                <RadioGroup className="flex flex-row items-center space-x-4 justify-around" value={borrowJersey} onValueChange={(value) => setBorrowJersey(value)}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="yes" />
                        <Label htmlFor="yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no" />
                        <Label htmlFor="no">No</Label>
                    </div>
                </RadioGroup>
                {borrowJersey === 'yes' && (
                    <FormField
                        control={form.control}
                        name={'size'}
                        render={({ field }) => (
                            <FormItem className='flex flex-col gap-1'>
                                <FormLabel className="font-normal text-xl">Jersey Size</FormLabel>
                                <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className='bg-white w-full'>
                                            <SelectValue placeholder='Size' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='XS'>XS</SelectItem>
                                            <SelectItem value='S'>S</SelectItem>
                                            <SelectItem value='M'>M</SelectItem>
                                            <SelectItem value='L'>L</SelectItem>
                                            <SelectItem value='XL'>XL</SelectItem>
                                            <SelectItem value='2XL'>2XL</SelectItem>
                                            <SelectItem value='3XL'>3XL</SelectItem>
                                            <SelectItem value='4XL'>4XL</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
            </>
        )
    };

    // const Positions = () => {
    //     return (
    //         {
    //             optionsList.map((option) => (
    //                 <div key={option.id} className="flex items-center space-x-2">
    //                     <Checkbox
    //                         id={option.id}
    //                         checked={selectedOptions.includes(option.id)}
    //                         onCheckedChange={(checked) => {
    //                             handleCheckboxChange(option.id, !!checked)
    //                         }}
    //                     />
    //                     <Label htmlFor={option.id}>{option.label}</Label>
    //                 </div>
    //             ))
    //         }
    //     )
    // }

    return (
        <div className="flex flex-row items-center justify-center p-4">
            <h1>Season Information...</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <span>
                        <FormField
                            control={form.control}
                            name={'height'}
                            render={({ field }) => (
                                <FormItem className='flex flex-col gap-1'>
                                    <FormLabel className="font-normal text-xl">
                                        Height:
                                    </FormLabel>
                                    <FormControl>
                                        <Input required placeholder="ft' in" {...field} className='bg-white' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <p>Do you already have a team?</p>
                        <RadioGroup className="flex flex-row items-center space-x-4 justify-around" value={hasTeam} onValueChange={(value) => setHasTeam(value)}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="yes" />
                                <Label htmlFor="yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="no" />
                                <Label htmlFor="no">No</Label>
                            </div>
                        </RadioGroup>
                    </span>
                    {hasTeam === 'yes' && (
                        <span>
                            <p>Are you the captain?</p>
                            <RadioGroup className="flex flex-row items-center space-x-4 justify-around" value={isCaptain} onValueChange={(value) => setIsCaptain(value)}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="yes" id="yes" />
                                    <Label htmlFor="yes">Yes</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="no" id="no" />
                                    <Label htmlFor="no">No</Label>
                                </div>
                            </RadioGroup>
                            {isCaptain === 'yes' && (
                                <>
                                    <TeamColor />
                                    <p>Would you like to add free agents into your team?</p>
                                    <RadioGroup className="flex flex-row items-center space-x-4 justify-around" value={wantFreeAgents} onValueChange={(value) => setWantFreeAgents(value)}>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="yes" id="yes" />
                                            <Label htmlFor="yes">Yes</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="no" id="no" />
                                            <Label htmlFor="no">No</Label>
                                        </div>
                                    </RadioGroup>

                                    {wantFreeAgents === 'yes' && (
                                        <>
                                            <p className="text-sm text-gray-500">
                                                Free agents will be notified, and once they accept, they will be added into your team.
                                            </p>
                                        </>
                                    )}
                                </>
                            )}
                            {isCaptain === 'no' && (
                                <TeamColor />
                            )}

                        </span>
                    )}

                    <Button type='submit' className="w-full bg-amber-200">Continue</Button>
                </form>
            </Form>
        </div>
    )
}

export default Registration;