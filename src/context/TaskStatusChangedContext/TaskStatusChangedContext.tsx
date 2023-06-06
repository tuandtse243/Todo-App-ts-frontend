import React, { createContext, FC, ReactElement, PropsWithChildren, useState } from 'react'

export const TaskStatusChangedContext = createContext({
    updated: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    toggle: () => {},
})

export const TaskStatusChangedContextProvider: FC<PropsWithChildren> = (props): ReactElement => {
    const [updated, setUpdated] = useState(false);

    function toggleHandler() {
        setUpdated(!updated);
    }

    return <TaskStatusChangedContext.Provider value={{ updated, toggle: toggleHandler }}>
        {props.children}
    </TaskStatusChangedContext.Provider>
}