import { LoginForm } from "@/components/login-form";
import { cn } from "@/lib/utils";

export function LoginPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <LoginForm />
    </div>
  );
}
