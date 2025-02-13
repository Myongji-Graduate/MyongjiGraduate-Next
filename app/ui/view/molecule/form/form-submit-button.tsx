import clsx from 'clsx';
import Button, { ButtonSize } from '../../atom/button/button';
import { useContext } from 'react';
import { FormContext } from './form.context';
import { useFormStatus } from 'react-dom';

interface FormSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  position?: 'left' | 'right' | 'center';
  variant?: 'primary' | 'secondary' | 'list';
  size?: ButtonSize;
}

export function FormSubmitButton({
  label,
  position = 'right',
  variant = 'primary',
  size = 'md',
  ...props
}: FormSubmitButtonProps) {
  const { formId } = useContext(FormContext);
  const { pending } = useFormStatus();

  return (
    <div
      className={clsx('flex', {
        'justify-start': position === 'left',
        'justify-center': position === 'center',
        'justify-end': position === 'right',
      })}
    >
      <Button
        loading={pending}
        aria-label="submit-button"
        // form={formId}
        size={size}
        variant={variant}
        type="submit"
        label={label}
        {...props}
      />
    </div>
  );
}
