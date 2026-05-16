*** Settings ***
Resource    ${EXECDIR}/robot-tests/resources/keywords.robot    # Imported from keywords.robot
Resource    ${EXECDIR}/robot-tests/variables.robot             # Imported from variables.robot

Suite Setup    Suite Initialization
Suite Teardown    Close Browser



*** Test Cases ***
Register New User
    Go To    ${FRONTEND_URL}/register
    
    Fill Text    css=[data-cy="username-input"]    ${TEST_USER}
    Fill Text    css=[data-cy="password-input"]    ${TEST_PASSWORD}

    Click    role=button[name="Register"]

    Wait For Navigation    **/login



Login User
    Go To    ${FRONTEND_URL}/login

    Fill Text    css=[data-cy="login-username"]    ${TEST_USER}
    Fill Text    css=[data-cy="login-password"]    ${TEST_PASSWORD}

    Click    role=button[name="Login"]

    Wait For Navigation    ${FRONTEND_URL}/




Create Message
    Go To    ${FRONTEND_URL}/getforminput

    Fill Text    css=[data-cy="message-title"]     Robot Title
    Fill Text    css=[data-cy="message-content"]   Robot Content
    Click        css=[data-cy="submit-message"]

    Wait For Elements State    text=Robot Title    visible
    Wait For Elements State    text=Robot Content  visible

Update Message
    Click    css=[data-cy="edit-message"]

    Fill Text    css=[data-cy="edit-title"]      Updated Robot Title
    Fill Text    css=[data-cy="edit-content"]    Updated Robot Content

    Click    css=[data-cy="save-message"]

    Wait For Elements State    text=Updated Robot Title    visible

Delete Message
    Click        css=[data-cy="delete-message"]
    Wait For Elements State    text=Updated Robot Title    hidden


Posts Should Load And Render Data
    Go To    ${POSTS_URL}

    Wait For Elements State    css=[data-cy="posts-heading"]    visible

    # Loading indicator may appear briefly
    Run Keyword And Ignore Error
    ...    Wait For Elements State    text=Loading...    visible    2s

    ${titles}=    Get Elements    css=h3
    Should Not Be Empty    ${titles}

    ${bodies}=    Get Elements    css=p
    Should Not Be Empty    ${bodies}

    ${title_text}=    Get Text    ${titles}[0]
    Should Not Be Empty    ${title_text}

    ${body_text}=    Get Text    ${bodies}[0]
    Should Not Be Empty    ${body_text}



UseEffectDemo Should Fetch Posts By Default
    Open Browser To UseEffectDemo

    Wait For Elements State    css=[data-cy="fetch-div"]    visible

    ${type}=    Get Text    css=[data-cy="show-data"]
    Should Be Equal    ${type}    posts

    ${data}=    Get Text    css=[data-cy="display-data"]
    Should Not Be Empty    ${data}


Switch To Comments Should Fetch New Data
    Click    css=[data-cy="btn-comments"]

    Wait Until Keyword Succeeds    5s    500ms
    ...    Validate Data Type    comments

    ${comments}=    Get Text    css=[data-cy="display-data"]
    Should Not Be Empty    ${comments}


Switch Back To Posts Should Update Data Again
    Click    css=[data-cy="btn-post"]

    Wait Until Keyword Succeeds    5s    500ms
    ...    Validate Data Type    posts

    ${posts}=    Get Text    css=[data-cy="display-data"]
    Should Not Be Empty    ${posts}


Home Page Should Render Title
    Go To    ${FRONTEND_URL}/

    Wait For Elements State
    ...    css=[data-cy="app-title"]
    ...    visible

    ${title}=    Get Text    css=[data-cy="app-title"]
    Should Be Equal    ${title}    Welcome to Poems























