import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Main from './main.js';

test('renders content', () => {
    const Main = {
      content: 'Component testing is done with react-testing-library',
      important: true
    }

    const Component = render(
        <Main main={main} />
    )

    expect(Component.container).toHaveTextContent(
        'Component testing is done with react-testing-library'
    )
});

test('<NoteForm /> updates parent state and calls onSubmit', () => {
    const createNote = jest.fn()
  
    const component = render(
      <NoteForm createNote={createNote} />
    )
  
    const input = component.container.querySelector('input')
    const form = component.container.querySelector('form')
  
    fireEvent.change(input, { 
      target: { value: 'testing of forms could be easier' } 
    })
    fireEvent.submit(form)
  
    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].content).toBe('testing of forms could be easier' )
  });