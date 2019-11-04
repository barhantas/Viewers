import React, { useState, createContext, useContext } from 'react';

const ModalContext = createContext(null);
const { Provider, Consumer } = ModalContext;

export const useModal = () => useContext(ModalContext);

const ModalProvider = ({ children, modal: Modal }) => {
  const DEFAULT_OPTIONS = {
    component: null /* The component instance inside the modal. */,
    backdrop: false /* Should the modal render a backdrop overlay. */,
    keyboard: false /* Modal is dismissible via the esc key. */,
    show: true /* Make the Modal visible or hidden. */,
    large: true /* Modal size. */,
    closeButton: true /* Should the modal body render the close button. */,
    title: null /* Should the modal render the title independently of the body content. */,
    customClassName: null /* The custom class to style the modal. */,
  };

  const [options, setOptions] = useState(DEFAULT_OPTIONS);

  /**
   * Show the modal and override its configuration props.
   *
   * @returns void
   */
  const show = (component, props = {}) =>
    setOptions({
      ...options,
      component,
      ...props,
    });

  /**
   * Hide the modal and set its properties to default.
   *
   * @returns void
   */
  const hide = () => setOptions(DEFAULT_OPTIONS);

  return (
    <Provider value={{ ...options, show, hide }}>
      <Consumer>
        {props => {
          const { component, footer, header, customClassName } = props;
          return component ? (
            <Modal
              className={`${customClassName} ${component.className}`}
              backdrop={options.backdrop}
              keyboard={options.keyboard}
              show={options.show}
              large={options.large}
              title={options.title}
              closeButton={options.closeButton}
              onHide={hide}
              footer={footer}
              header={header}
            >
              {component}
            </Modal>
          ) : null;
        }}
      </Consumer>
      {children}
    </Provider>
  );
};

/**
 * Higher Order Component to use the modal methods through a Class Component.
 *
 * @returns
 */
export const withModal = Component => {
  return function WrappedComponent(props) {
    return <Component {...props} modalContext={{ ...useModal() }} />;
  };
};

export default ModalProvider;

export const ModalConsumer = ModalContext.Consumer;
