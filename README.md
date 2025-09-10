# Appointment-Management-System

# Angular Frontend Setup Instructions
1. Prerequisites

    Make sure the following are installed on your system:

    Node.js (latest LTS recommended) → Download here

    npm (comes with Node.js)

    Angular CLI → Install globally (if not already):

    npm install -g @angular/cli

2. Clone the Project
    git clone <your-repo-url>
    cd <your-project-folder>

3. Install Dependencies
    npm install

4. Run the Development Server
    ng serve -or- npm start

Then open in browser:
     http://localhost:4200

5. Build for Production (Optional)

    If you want to create a production build:

    ng build --prod

    This will generate files in the dist/ folder.


# Dotnet Backend setup instruction

1. Prerequisites

    Make sure you have installed:

    dotnet --version (to check installed version)

    add visual studio code

2. Clone the Project
    git clone <your-repo-url>
    open project in visual studio code

3. Restore Dependencies
    dotnet restore (for Nuget package like EFCORE and Swashbuckle)

4. Apply Migrations (if using EF Core)

    If the project uses Entity Framework Core:

    dotnet ef database update

5. Run the Project
    dotnet run

    The API will usually start at:
     http://localhost:5000

6. Test with Swagger (Optional)

    Most .NET Web API projects have Swagger enabled.
    Open in browser:
    http://localhost:5000/swagger