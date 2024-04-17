import clsx from 'clsx';
import Button, { ButtonSize } from '../../atom/button/button';
import { useContext } from 'react';
import { FormContext } from './form.context';
import { useFormStatus } from 'react-dom';

interface FormSubmitButtonProps {
  label: string;
  position?: 'left' | 'right' | 'center';
  variant?: 'primary' | 'secondary' | 'list';
  size?: ButtonSize;
  disabled?: {
    value: boolean;
    control: boolean;
  };
}

export function FormSubmitButton({
  label,
  position = 'right',
  variant = 'primary',
  size = 'md',
  disabled = {
    value: false, // disabled의 값
    control: false, // disabled 를 control 하는지 (현재 form에서는 과목 추가에서만 disabled를 control)
  },
}: FormSubmitButtonProps) {
  const { formId, isSuccess } = useContext(FormContext);
  const { pending } = useFormStatus();
  const disabledValue = disabled.value ? true : disabled.control && isSuccess ? true : false;

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
        form={formId}
        size={size}
        variant={variant}
        type="submit"
        label={label}
        disabled={disabledValue}
      />
    </div>
  );
}
