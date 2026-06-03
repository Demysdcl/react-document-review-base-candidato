import { memo } from 'react';
import './styles.css';

type ErrorStateProps = {
    message: string;
};

export const ErrorState = memo(function ErrorState({ message }: ErrorStateProps) {
    return (
        <section className="error-card" role="alert" aria-live="assertive">
            <span className="error-emoji" aria-hidden="true">⚠️</span>
            <div>
                <h2 className="error-title">Não foi possível carregar os documentos</h2>
                <p className="error-message">{message}</p>
            </div>
        </section>
    );
});
