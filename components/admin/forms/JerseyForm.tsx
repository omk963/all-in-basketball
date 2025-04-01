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
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Jersey } from "@/types";
import { jerseySchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Props extends Partial<Jersey> {
    type?: 'create' | 'update'
}

const JerseyForm = ({ type, ...jersey }: Props) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof jerseySchema>>({
        resolver: zodResolver(jerseySchema),
        defaultValues: {
            number: '',
            description: '',
            borrowed: false,
        }
    })

    const onSubmit = async (values: z.infer<typeof jerseySchema>) => { };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name={'number'}
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-1'>
                            <FormLabel className="font-normal">Jersey Number</FormLabel>
                            <FormControl>

                                <Input required placeholder='#' {...field} className='' />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={'description'}
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-1'>
                            <FormLabel className="font-normal">
                                Description
                            </FormLabel>
                            <FormControl>
                                <Textarea placeholder="Describe the condition of the jersey" {...field} rows={10} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Add Jersey</Button>
            </form>
        </Form>
    )
}

export default JerseyForm;