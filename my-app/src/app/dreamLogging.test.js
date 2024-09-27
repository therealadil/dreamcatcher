// Import necessary testing tools and components.
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormPage from './form/page';
import { act } from 'react';

//This line tells Jest to replace the actual 'next/navigation' module with a mock implementation.
jest.mock('next/navigation', () => ({
useRouter: () => ({
    push: jest.fn(),
}),
}));



//This code snippet is setting up Jest mocks for the supabaseClient module,
//to facilitate testing without making actual network requests.
const insertMock = jest.fn().mockResolvedValue({ data: {}, error: null });//This creates a moc insert function to resolve auth.
jest.mock('../lib/supabaseClient', () => ({ //This tells Jest to mock the module located at ../lib/supabaseClient.

//This lets Jest through auth as test user.
    supabase: {
    from: jest.fn(() => ({
    insert: insertMock,
    })),
    auth: {
    getUser: jest.fn().mockResolvedValue({ data: { user: { id: 'test-user-id' } }, error: null }),
    },
},
})); 




// Create a mockDream object with title, entry, and date
describe('Dream Logging Functionality', () => { // Describes the test suite
test('Adds a new dream entry and displays it correctly', async () => { // Defines a test case
    const mockDream = { // Creates mock data for the test
        id: 'dream123',
        title: 'A weird dream',
        entry: 'I dreamed I was frying an egg on the sidewalk!',
        created_at: new Date().toISOString().slice(0, 16), // Format: YYYY-MM-DDTHH:mm.
    };
    
// Rendeer the form page.
    render(<FormPage />);
    
// Check if mock dream entry is displayed.
    await userEvent.type(screen.getByPlaceholderText(/Enter your dream title here/i), mockDream.title);
    await userEvent.type(screen.getByPlaceholderText(/Enter your dream here/i), mockDream.entry);
    
    
    
    


// Selects the date-time input and clears its value before typing a mock date.
    
    const dateInput = screen.getByDisplayValue(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/); 
//The regular expression will match strings that follow the format YYYY-MM-DDTHH:MM.
    
    await userEvent.clear(dateInput); //Clears the current value of the dateInput element.

    await userEvent.type(dateInput, mockDream.created_at);//types the value of mockDream.created_at into the dateInput element.

    await act(async () => { //Act wraps the asynchronous operations to ensure the component is updated correctly.

    await userEvent.click(screen.getByRole('button', { name: /Submit/i }));// Simulates clicking the submit button.
    });

    
    await waitFor(() => {//Waits for the callback function inside it to not throw an error.
        expect(insertMock).toHaveBeenCalledWith({//Watches for the insert mock function to have been called with the expected object.
        user_id: expect.any(String),
        title: mockDream.title,
        entry: mockDream.entry,
        created_at: expect.any(String)
        });

    });
});
});