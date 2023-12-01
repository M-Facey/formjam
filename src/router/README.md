# FormJAM Router

In this README, we will provide an overview of the different layouts, routes, and pages associated with those routes to help you navigate our application effectively.

## Layouts

1. Dashboard Layout

The dashboard layout is used for all the public pages within the user dashboard. It includes the navigation menu and dashboard-specific components. You can explore it in the [layouts/dashboard.vue](../layout/dashboard.vue) file.

2. Auth Layout

The auth layout is specifically designed for authentication-related pages such as login and registration. The header is removed, and it only has a theme toggle and footer. You can locate it in the [layouts/auth.vue](../layout/auth.vue) file.

3. Default Layout

The default layout is the base layout used throughout the application. It provides the common structure, header, and footer for all pages. You will find it in the [layouts/default.vue](../layout/default.vue) file.

4. Form Layout

The form layout is used for all the pages within the form dashboard. It includes the creation and modification form pages and form-specific components. You can explore it in the [layouts/form.vue](../layout/form.vue) file.

## Routes & Pages

| Page Name        | URL                                   | Route     | Layout    | Description                                                                                     |
| ---------------- | ------------------------------------- | --------- | --------- | ----------------------------------------------------------------------------------------------- |
| Home             | /                                     | Base      | Default   | The landing page of the application, providing an overview and welcoming users to the project.  |
| Login            | /auth/login                           | Auth      | Auth      | Allows registered users to log in using their credentials.                                      |
| Signup           | /auth/signup                          | Auth      | Auth      | New users can create an account and sign up for the application.                                |
| PasswordRest     | /auth/reset-your-password             | Auth      | Auth      | Allows users to send reset password instructions to their email                                 |
| ConfirmPassword  | /auth/confirm-password-reset/`:token` | Auth      | Auth      | Users can create a new password to use for the application                                      |
| Dashboard        | /dashboard                            | Dashboard | Dashboard | The dashboard page where registered users can access application-specific features and content. |
| Create/Edit Form | /form/`:formId`/edit                  | Form      | Form      | The form page where registered users can create & edit form-specific features and content.      |
| View Form        | /form/`:formId`/view                  | Form      | Form      | The form page where users can submit form-specific features and content.                        |
| Preview Form     | /form/`:formId`/view?preview=true     | Form      | Form      | The form page where registered users can preview form-specific features and content.            |
| Success Form     | /form/`:formId`/success               | Form      | Form      | The form page where users can view success page after form is submitted                         |
