import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Styles from './Login.module.css';
import { FormContainer, FormField, FormError, FormActions, FormCheckbox } from '../../components/common/Form'; 

export const Login = () => {
    const [corporateEmail, setCorporateEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);

    const navigate = useNavigate();

    // Simulação da chamada de API de autenticação
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
        
        // Simulação de delay de rede
        await new Promise(resolve => setTimeout(resolve, 1500)); 

        try {
            // **TODO:** Substituir por chamada real à API (Ex: axios.post('/api/auth/login', { corporateEmail, password }))
            
            // Simulação de autenticação (usando credencial de exemplo: lucas.andrade@movix.com / 123456)
            if (corporateEmail === 'lucas.andrade@movix.com' && password === '123456') {
                
                localStorage.setItem("authToken", "valid_jwt_token_45678");

                if (rememberMe) {
                    // Lógica para persistir o token por mais tempo, se "Lembrar-me" estiver marcado
                    console.log("Token salvo com persistência.");
                }

                // Redireciona
                navigate('/dashboard', { replace: true });

            } else {
                setAuthError('Credenciais inválidas. Verifique seu e-mail corporativo e senha.');
                localStorage.removeItem("authToken");
            }

        } catch (err) {
            console.error('Erro de rede/API ao fazer login:', err);
            setAuthError('Falha na comunicação com o servidor. Tente novamente.');
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