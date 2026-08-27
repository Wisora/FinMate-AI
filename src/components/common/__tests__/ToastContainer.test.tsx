import React from 'react';
import { render, screen, fireEvent, act } from '../../test-utils';
import { ToastContainer, ToastMessage } from '../ToastContainer';

const mockToasts: ToastMessage[] = [
  { id: '1', type: 'success', message: 'Settings saved successfully!' },
  { id: '2', type: 'error', message: 'Failed to sync data.' },
];

describe('ToastContainer Component', () => {
  const mockOnDismiss = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders active toast notifications', () => {
    render(<ToastContainer toasts={mockToasts} onDismiss={mockOnDismiss} />);

    expect(screen.getByText('Settings saved successfully!')).toBeInTheDocument();
    expect(screen.getByText('Failed to sync data.')).toBeInTheDocument();
    expect(screen.getAllByRole('alert')).toHaveLength(2);
  });

  test('calls onDismiss after 4.5 second auto-dismiss timer', () => {
    render(<ToastContainer toasts={[mockToasts[0]]} onDismiss={mockOnDismiss} />);

    act(() => {
      jest.advanceTimersByTime(4500);
    });

    expect(mockOnDismiss).toHaveBeenCalledWith('1');
  });

  test('calls onDismiss when user manually clicks close button', () => {
    render(<ToastContainer toasts={[mockToasts[0]]} onDismiss={mockOnDismiss} />);

    const closeButton = screen.getByRole('button', { name: /Close notification/i });
    fireEvent.click(closeButton);

    expect(mockOnDismiss).toHaveBeenCalledWith('1');
  });
});
