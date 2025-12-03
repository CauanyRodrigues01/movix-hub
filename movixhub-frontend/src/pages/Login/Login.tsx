import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Styles from './Login.module.css';
import { FormContainer, FormField, FormError, FormActions, FormCheckbox } from '../../components/common/Form';
import { authService } from '../../services/authService';
import axios from 'axios';

export const Login = () => {
    const [corporateEmail, setCorporateEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleLogin = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthError(null);
        setIsLoading(true);

        // Validação básica
        if (!corporateEmail || !password) {
            setAuthError('Por favor, preencha o e-mail e a senha.');
            setIsLoading(false);
            return;
        }

        try {
            // Chama a API real
            const response = await authService.login({
                corporateEmail,
                password,
            });

            // Salva o token no localStorage
            localStorage.setItem('authToken', response.token);

            // Opcionalmente, salva dados do usuário
            localStorage.setItem('userData', JSON.stringify({
                id: response._id,
                fullName: response.fullName,
                corporateEmail: response.corporateEmail,
                accessProfile: response.accessProfile,
            }));

            if (rememberMe) {
                // Lógica adicional se necessário
                console.log('Token salvo com persistência.');
            }

            // Redireciona para o dashboard
            navigate('/dashboard', { replace: true });

        } catch (err) {
            console.error('Erro ao fazer login:', err);

            // Trata erros da API com type guard
            if (axios.isAxiosError(err)) {
                // Erro do Axios (da API ou de rede)
                if (err.response) {
                    // Erro retornado pela API
                    setAuthError(err.response.data.message || 'Credenciais inválidas.');
                } else if (err.request) {
                    // Erro de rede (sem resposta do servidor)
                    setAuthError('Erro de conexão. Verifique se o servidor está rodando.');
                } else {
                    // Outro erro do Axios
                    setAuthError('Erro inesperado. Tente novamente.');
                }
            } else {
                // Erro que não é do Axios
                setAuthError('Erro inesperado. Tente novamente.');
            }

            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
        } finally {
            setIsLoading(false);
        }
    }, [corporateEmail, password, rememberMe, navigate]);

    return (
        <div className={Styles.loginWrapper}>
            <div className={Styles.loginBox}>
                <h1 className={Styles.title}>MovixHub</h1>
                <p className={Styles.subtitle}>Acesso Administrativo</p>
                
                <FormContainer onSubmit={handleLogin}>
                    
                    {/* Exibir erro global de autenticação */}
                    <FormError message={authError} onClose={() => setAuthError(null)} />
                    
                    <FormField 
                        label="E-mail Corporativo"
                        id="corporateEmail"
                        name="corporateEmail"
                        type="email"
                        value={corporateEmail}
                        onChange={(e) => setCorporateEmail(e.target.value)}
                        required
                        disabled={isLoading}
                        placeholder="seu.nome@movix.com"
                    />
                    
                    <FormField 
                        label="Senha"
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                        placeholder="Mínimo 8 caracteres"
                    />

                    <div className={Styles.formOptions}>
                        <FormCheckbox 
                            label="Lembrar-me"
                            id="rememberMe"
                            name="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            disabled={isLoading}
                        />
                        
                        <a href="#" className={Styles.forgotPassword} onClick={(e) => e.preventDefault()}>
                            Esqueceu sua senha?
                        </a>
                    </div>
                    
                    <FormActions 
                        submitLabel="Entrar"
                        isLoading={isLoading}
                    />

                </FormContainer>
            </div>
        </div>
    );
};