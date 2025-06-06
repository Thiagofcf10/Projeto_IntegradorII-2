        
        const supabaseUrl = 'https://ribvjcjogwukedhhkgbx.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpYnZqY2pvZ3d1a2VkaGhrZ2J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5Njk4MDMsImV4cCI6MjA1NjU0NTgwM30.152UN5yiJrWyHIeBnZjSmIhGargSRDTqs1BYF0qohwQ';
        const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
        
        
        
        async function login() {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // hCaptcha validation
            const captchaToken = await _supabase.auth.getCaptchaToken({ captchaType: 'hcaptcha' });
            if (!captchaToken) {
            alert('Por favor, resolva o captcha antes de continuar.');
            return;
            }

            const { data, error } = await _supabase.auth.signInWithPassword({
            email: email,
            password: password,
            options: {
                captchaToken: captchaToken
            }
            });

            if (error) {
            console.error('Error logging in:', error);
            alert('Login failed: ' + error.message);
            } else {
            console.log('Logged in successfully:', data);
            alert('Login successful!');
            document.getElementById('mainContent').style.display = 'block';
            document.getElementById('loginContainer').style.display = 'none';
            }
        }