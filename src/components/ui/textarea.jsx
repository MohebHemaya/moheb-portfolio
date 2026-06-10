import { cn } from "@/lib/utils"

function Textarea({
  className,
  ...props
}) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-[120px] w-full rounded-xl border border-dark-600 bg-dark-800 px-4 py-3 text-sm text-gray-100 transition-colors placeholder:text-gray-500 focus-visible:outline-none focus-visible:border-primary-500/50 focus-visible:ring-2 focus-visible:ring-primary-500/20 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
        className
      )}
      {...props} />
  );
}

export { Textarea }
