import { useState } from 'react';

import { ITemplateContainerProps } from './TemplateContainer.types';

export const useTemplateContainerRules = () => {

  // Estados dos Inputs e Tags
  const [ textInputs, setTextInputs ] = useState<ITemplateContainerProps>({
    title: '',
    tags: [],
    tagsInput: '',
  });
  
  // Adiciona uma nova tag
  const handleTagInputChange = (_: any, newInputValue: string) => {
    setTextInputs((prev) => ({ ...prev, tagsInput: newInputValue }));
  };
  
  // Adiciona uma nova tag ao pressionar Enter ou ,
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();

      const newTag = textInputs.tagsInput.trim();
      if (newTag !== "" && !textInputs.tags.includes(newTag)) {
        setTextInputs((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag],
          tagsInput: "",
        }));
      }
    }
  };
  
  // Remove uma tag
  const handleDeleteTag = (tagToDelete: string) => {
    setTextInputs({
      ...textInputs,
      tags: textInputs.tags.filter((tag) => tag !== tagToDelete),
    });
  };

  return {
    // Relacionados a Inputs e Tags
    textInputs,
    setTextInputs,
    handleTagInputChange,
    handleKeyDown,
    handleDeleteTag
  }
};