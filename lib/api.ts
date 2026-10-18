// API configuration
export const API_CONFIG = {
    BASE_URL: 'http://localhost/api.php',
    API_KEY: '987456321789654123987456321123654789',
};

// API endpoint
export const getApiUrl = () => {
    return `${API_CONFIG.BASE_URL}?api_key=${API_CONFIG.API_KEY}`;
};

// Fetch portfolio data from API
export async function fetchPortfolioData() {
    try {
        const response = await fetch(getApiUrl(), {
            method: 'GET',
            mode: 'cors', // Explicitly enable CORS
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const result = await response.json();

        if (!result.success) {
            throw new Error('API returned unsuccessful response');
        }

        return result.data;
    } catch (error) {
        console.warn('API Server is unreachable. Please ensure http://localhost/api.php is running with the correct API key.');
        // Return null on error - component will handle fallback automatically
        return null;
    }
}

// Type definitions for the API response
export interface PortfolioData {
    hero_section: {
        name: string;
        role: string[];
        paragraph: string;
        stats: Array<{ number: string; label: string }>;
        buttons: Array<{ text: string; link: string; type: string }>;
    };
    projects_section: {
        title: string;
        subtitle: string;
        filter_categories: string[];
        projects: Array<{
            id: number;
            title: string;
            category: string;
            privacy: string;
            description: string;
            tech: string[];
            link: string;
            github: string;
            order: number;
        }>;
    };
    skills_section: {
        title: string;
        subtitle: string;
        filter_categories: string[];
        skill_categories: Array<{
            name: string;
            skills: string[];
            order: number;
        }>;
    };
    about_section: {
        title: string;
        paragraph: string;
        description: string;
        interests: Array<{ name: string; icon: string }>;
        quote: { text: string; author: string };
    };
    services_section: {
        title: string;
        subtitle: string;
        services: Array<{
            id: number;
            title: string;
            icon: string;
            description: string;
            tools: string[];
            order: number;
        }>;
    };
    contact_section: {
        title: string;
        subtitle: string;
        contact_info: Array<{
            name: string;
            value: string;
            icon: string;
            link: string;
        }>;
        availability: Array<{
            title: string;
            value: string;
            subtext: string;
        }>;
    };
    achievements_section: {
        title: string;
        achievements: Array<{
            id: number;
            icon: string;
            title: string;
            desc: string;
            order: number;
        }>;
    };
    timeline_section: {
        title: string;
        experiences: Array<{
            id: number;
            year: string;
            title: string;
            company: string;
            description: string;
            order: number;
        }>;
    };
    code_editor_section: {
        title: string;
        snippets: Array<{
            language: string;
            filename: string;
            code: string;
        }>;
    };
    themes_section: {
        current_theme: string;
        available_themes: Array<{
            name: string;
            variables: {
                bg_primary: string;
                bg_card: string;
                bg_nav: string;
                text_primary: string;
                accent_cyan: string;
                accent_blue: string;
                background: string;
                foreground: string;
            };
            is_active: boolean;
        }>;
    };
}
