import { classNames } from "@/ui.stylex";
import { cn } from "@/lib/utils";

function ExampleWrapper({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={classNames.example122}>
      <div
        data-slot="example-wrapper"
        className={cn(classNames.example123, className)}
        {...props}
      />
    </div>
  );
}

function Example({
  title,
  children,
  className,
  containerClassName,
  ...props
}: React.ComponentProps<"div"> & {
  title: string;
  containerClassName?: string;
}) {
  return (
    <div data-slot="example" className={cn(classNames.example124, containerClassName)} {...props}>
      <div className={classNames.example125}>{title}</div>
      <div data-slot="example-content" className={cn(classNames.example126, className)}>
        {children}
      </div>
    </div>
  );
}

export { ExampleWrapper, Example };
