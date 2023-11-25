import { useNavigate } from 'react-router-dom'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import FileUploader from "@/components/shared/FileUploader"
import { PostValidation } from "@/lib/validation"
import { Models } from "appwrite"
import { useUserContext } from "@/context/AuthContext"
import { useToast } from "@/components/ui/use-toast"
import { useCreatePost, useUpdatePost } from '@/lib/react-query/queriesAndMutations'
import LoaderBtnDisplay from '@/components/shared/LoaderBtnDisplay'

type PostFormProps = {
  post?: Models.Document;
  action: 'Create' | 'Update'
}

const PostForm = ({ post, action }: PostFormProps) => {
  const { user } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate()

  const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();

  // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post.tags.join(',') : ''
    },
  })
 
  // 2. Define a submit handler.
  async function handleSubmit(values: z.infer<typeof PostValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //console.log('POSTFORM_ONSUBMIT: Form values submitted');
    if (post && action === 'Update') {
      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      })

      if (!updatedPost) {
        toast({ title: `${action} post failed. Please try again` })
      }

      return navigate(`/posts/${post.$id}`)
    }

    const newPost = await createPost({
      ...values,
      userId: user.id,
    });
    //console.log('POSTFORM_ONSUBMIT: New post created', newPost);

    if (!newPost) {
      toast({
        title: `${action} post failed. Please try again`
      });
    }

    navigate('/');
  }

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(handleSubmit)} 
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea custom-scrollbar" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader 
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type='text' className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (separated by comma " , ")
              </FormLabel>
              <FormControl>
                <Input 
                  type='text'
                  className="shad-input" 
                  placeholder="art, expression, learn"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button type="button" className="shad-button_dark_4">Cancel</Button>
          <Button 
            type="submit" 
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            <LoaderBtnDisplay 
              loaderCondition={isLoadingCreate || isLoadingUpdate}
              loadingText={action.slice(0, -1) + 'ing Post'}
              notLoadingText={action + ' Post'}
            />
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default PostForm