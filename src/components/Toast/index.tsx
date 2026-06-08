import './styles.css';

type ToastProps = {
    visible: boolean;
    message: string;
    onClose: () => void;
};

export const Toast = ({ visible, message, onClose }: ToastProps) => {

    if (!visible) {
        return null;
    }


    return (
        <div className="toast">
            <span className="close" onClick={onClose}>×</span>
            <p>{message}</p>
        </div>
    );
};
