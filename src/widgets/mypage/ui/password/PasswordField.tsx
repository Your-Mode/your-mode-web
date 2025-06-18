'use client';

import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/src/shared/components/ui/input';
import styled from '@emotion/styled';
import { Label } from '@/src/shared/components/ui/label';

interface Props {
  control: Control<any>;
  name: string;
  label: string;
  helpText?: string;
  error?: string;
}

export default function PasswordField({ control, name, label, helpText, error }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <FieldWrapper>
      <Label htmlFor={name}>{label}</Label>
      <InputWrapper>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <StyledInput
              {...field}
              id={name}
              type={visible ? 'text' : 'password'}
              placeholder={label}
            />
          )}
        />
        <ToggleButton type="button" onClick={() => setVisible(v => !v)}>
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </ToggleButton>
      </InputWrapper>
      {helpText && <HelpText>{helpText}</HelpText>}
      {error && <ErrorText>{error}</ErrorText>}
    </FieldWrapper>
  );
}

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled(Input)`
  width: 100%;
  &:focus {
    border-color: #ff3e6c;
    box-shadow: 0 0 0 2px rgba(255, 62, 108, 0.1);
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.25rem;
  &:hover { color: #ff3e6c; }
`;

const HelpText = styled.p`
  font-size: 0.75rem;
  color: #666;
  line-height: 1.4;
`;

const ErrorText = styled.p`
  color: #ef4444;
  font-size: 0.75rem;
`;
