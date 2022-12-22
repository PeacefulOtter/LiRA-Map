/** @author Benjamin Lumbye s204428 */

import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import toast, { Toast } from 'react-hot-toast';

import '../css/toast.css';

const createToast = (
  content: { title: string; footer?: string },
  options:
    | Partial<
        Pick<
          Toast,
          | 'id'
          | 'icon'
          | 'duration'
          | 'ariaProps'
          | 'className'
          | 'style'
          | 'position'
          | 'iconTheme'
        >
      >
    | undefined = {},
) => {
  return toast(
    (t) => (
      <div className="toast-warning">
        <FiAlertTriangle
          strokeWidth={1.5}
          color="#FFEB3B"
          className="toast-icon"
        />
        <div className="toast-content">
          <span className="toast-body">{content.title}</span>
          {content.footer && (
            <>
              <hr className="toast-divider" />
              <span className="toast-footer">{content.footer}</span>
            </>
          )}
        </div>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="toast-button btn"
        >
          OK
        </button>
        <button onClick={() => toast.dismiss()} className="toast-button btn">
          Close All
        </button>
      </div>
    ),
    {
      duration: Infinity,
      position: 'top-center',
      style: {
        background: 'var(--background)',
        color: '#fff',
      },
      ...options,
    },
  );
};

export default createToast;
