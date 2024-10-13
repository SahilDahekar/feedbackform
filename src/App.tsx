import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Textarea } from "./components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
  }),
  sessionRating: z.string().min(1).max(5),
  speakerRating: z.string().min(1).max(5),
  feedback: z.string().min(4, {
      message: "Feedback must be at least 4 characters.",
  }),
});

function App() {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        feedback: "",
        sessionRating: "",
        speakerRating: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {

      setIsLoading(true);
      const fullName = values.name;
      const feedback = values.feedback;
      const sessionRating = values.sessionRating;
      const speakerRating = values.speakerRating;

      const payload = {
        fullName: fullName,
        feedback: feedback,
        rating: Number(sessionRating),
        speakers: Number(speakerRating)
      }

      // await new Promise((resolve) => { setTimeout(resolve,3000);});

      const res = await axios.post('https://feedbackend.parthbhattad.in/feedback', payload);
      if (res.status !== 201) {
        throw new Error("Unable to Submit");
      }
      const data = res.data;
      console.log(data);
      console.log(payload);
      console.log(typeof payload.rating);


    } catch (error) {

      console.error(error);

    } finally {

      setIsLoading(false);
      navigate("/success");
    }
  }


  return (
    <>
    <div className="text-center">
      <div className="my-4">
        <h1 className="text-5xl font-bold mt-8 mb-6">Feeback Form</h1>
        <p className="px-6 text-gray-800">We value your feedback! <br />Please share your thoughts on the session, including any suggestions for improvement or topics you'd like to see covered in the future.</p>
      </div>
    </div>
    <div className="mx-auto w-[350px] mt-12 mb-6">
    <Form {...form}>
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
        >
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="font-bold text-lg">Name <span className="text-red-500 ml-1 font-bold">*</span></FormLabel>
                        <FormControl>
                            <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="sessionRating"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="font-bold text-lg">How would you rate the Session ? <span className="text-red-500 ml-1 font-bold">*</span></FormLabel>
                        <Select onValueChange={field.onChange}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a rating out of 5" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="speakerRating"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="font-bold text-lg">How would you rate the Speakers ? <span className="text-red-500 ml-1 font-bold">*</span></FormLabel>
                        <Select onValueChange={field.onChange}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a rating out of 5" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="feedback"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="font-bold text-lg">Additional Feedback <span className="text-red-500 ml-1 font-bold">*</span></FormLabel>
                        <FormControl>
                            <Textarea placeholder="Type your Feedback hear" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="submit" className="w-full font-bold text-lg" disabled={isLoading}>
                {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}{" "}
                Submit
            </Button>
        </form>
    </Form>
    </div>
    </>
  )
}

export default App
