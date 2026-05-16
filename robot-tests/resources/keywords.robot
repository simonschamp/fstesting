*** Settings ***
Library    Browser
Library    RequestsLibrary

*** Keywords ***
Suite Initialization
    Delete Test Users
    Reset Messages
    New Browser    ${BROWSER}
    New Context
    New Page


Close Browser
    Browser.Close Browser

Delete Test Users
    Create Session    backend    ${BACKEND_URL}
    DELETE On Session    backend    /api/test/user/${TEST_USER}

Reset Messages
    Create Session    backend    ${BACKEND_URL}
    DELETE On Session    backend    /api/messages/reset


Open Browser To Posts Page
    Go To    ${POSTS_URL}


Open Browser To UseEffectDemo
    Go To    ${FRONTEND_URL}/use-effect


Validate Data Type
    [Arguments]    ${expected}
    ${text}=    Get Text    css=[data-cy="show-data"]
    Should Be Equal    ${text}    ${expected}



Create Message
    [Arguments]    ${title}    ${content}

    Go To    ${FRONTEND_URL}/getforminput

    Wait For Elements State    css=[data-cy="message-title"]    visible

    Fill Text    css=[data-cy="message-title"]     ${title}
    Fill Text    css=[data-cy="message-content"]   ${content}
    Click        css=[data-cy="submit-message"]

    Wait For Elements State    text=${title}    visible




















