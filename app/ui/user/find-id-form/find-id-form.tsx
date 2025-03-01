'use client';
import { findUserToStudentNumber } from '@/app/business/services/user/user.query';
import Form from '../../view/molecule/form';
import { FormState } from '../../view/molecule/form/form-root';

interface SignUpFormProps {
  onNext?: (formState?: FormState) => void;
}

function FindIdForm({ onNext }: SignUpFormProps) {
  return (
    <Form onSuccess={onNext} id="아이디찾기" action={findUserToStudentNumber}>
      <Form.TextInput autoFocus={true} required={true} label="학번" id="studentNumber" placeholder="ex ) 60xxxxxx" />
      <div className="py-6">
        <Form.SubmitButton label="아이디찾기" position="center" variant="primary" />
      </div>
    </Form>
  );
}

export default FindIdForm;
