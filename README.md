# Test Automation Assessment

## Tools and Software Required

- **Node.js**: [Download and Install Node.js](https://nodejs.org/)
- **Cypress**: [Install Cypress](https://www.cypress.io/)

## Application URL

- **EMI Calculator**: [https://emicalculator.net/](https://emicalculator.net/)

## Test Cases

### UI Test

#### Test Case 1: Validate the EMI Pie Chart

**Steps:**

1. Launch the application URL: [https://emicalculator.net/](https://emicalculator.net/)
2. Go to the "Home Loan" tab.
3. Provide the following values and calculate the EMI:
   - **Example 1**:
     - Home Loan Amount: 25L
     - Interest Rate: 10%
     - Tenure: 10 Years
   - **Example 2**:
     - Home Loan Amount: 50L
     - Interest Rate: 7.5%
     - Tenure: 15 Years
4. Check the availability of the pie chart.
5. Read the numbers from both sections of the pie chart and ensure both values are greater than zero. Pass the test if they are, else fail.

#### Test Case 2: Validate the EMI Bar Chart

**Steps:**

1. Launch the application URL: [https://emicalculator.net/](https://emicalculator.net/)
2. Go to the "Personal Loan" tab.
3. Adjust the slider values for:
   - Personal Loan Amount: 10L
   - Interest Rate: 12%
   - Tenure: 5 Years
4. Change the month using the "Schedule showing EMI payments starting from" calendar widget.
5. Check the availability of the bar chart.
6. Count the number of bars in the bar chart.
7. Read the value from any one bar tooltip.

### API Test

#### Test Case 3: Validate the Parameters of API

**Pre-requisite:**

1. Store the following parameters from the API response in a CSV or JSON file:
   - ID
   - email
   - first_name
   - last_name
   - Save the file in the `cypress/fixtures` directory.

**Steps:**

1. Access the API endpoint: `https://reqres.in/api/users?page=2`
2. Check for the response status code. Pass the step if it’s `200 OK`, else fail.
3. Validate the parameters (`ID`, `email`, `first_name`, `last_name`) from the API response against the stored fixtures.

## Setup and Running the Tests

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
