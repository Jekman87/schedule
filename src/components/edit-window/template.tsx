export const templateModalWindow = [
    {
        key: "project task",
        template: {
            name: true, // *; mentor enters text in input
            type: true, // *; select
            form: false,
            place: false,
            kind: true, // *; select
            tags: true, // select
            dateTime: true,
            description: true, // mentor enters text in textarea
            descriptionUrl: true, // mentor enters text in input
            eventURL: true,
            deadlinedateTime: true,
            deadlineDescription: true,
            organizer: true, // *; mentor enters text in input; array strings
            duration: true, //? or number
            comment: true,
            isFeedback: true, // *; switcher
            feedback: true,
            materials: true, // {links: string | null, video: string | null, images: string | null}
            stage: true, // *; select
            course: true, // *; mentor enters text in input    
        }
    },
    
    {
        key: "js task",
        template: {
            name: true, // *; mentor enters text in input
            type: true, // *; select
            form: false,
            place: false,
            kind: true, // *; select
            tags: true, // select
            dateTime: true,
            description: true, // mentor enters text in textarea
            descriptionUrl: true, // mentor enters text in input
            eventURL: true,
            deadlinedateTime: true,
            deadlineDescription: true,
            organizer: true, // *; mentor enters text in input; array strings
            duration: true, //? or number
            comment: true,
            isFeedback: true, // *; switcher
            feedback: true,
            materials: true, // {links: string | null, video: string | null, images: string | null}
            stage: true, // *; select
            course: true, // *; mentor enters text in input    
        }
    },
    
    {
        key: "codewars",
        template: {
            name: true, // *; mentor enters text in input
            type: true, // *; select
            form: false,
            place: false,
            kind: false, // *; select
            tags: true, // select
            dateTime: true,
            description: true, // mentor enters text in textarea
            descriptionUrl: true, // mentor enters text in input
            eventURL: false,
            deadlinedateTime: true,
            deadlineDescription: true,
            organizer: true, // *; mentor enters text in input; array strings
            duration: false, //? or number
            comment: true,
            isFeedback: false, // *; switcher
            feedback: false,
            materials: false, // {links: string | null, video: string | null, images: string | null}
            stage: true, // *; select
            course: true, // *; mentor enters text in input    
        }
    },

    {
        key: "test",
        template: {
            name: true, // *; mentor enters text in input
            type: true, // *; select
            form: false,
            place: false,
            kind: false, // *; select
            tags: true, // select
            dateTime: true,
            description: true, // mentor enters text in textarea
            descriptionUrl: false, // mentor enters text in input
            eventURL: false,
            deadlinedateTime: true,
            deadlineDescription: false,
            organizer: true, // *; mentor enters text in input; array strings
            duration: false, //? or number
            comment: true,
            isFeedback: false, // *; switcher
            feedback: false,
            materials: false, // {links: string | null, video: string | null, images: string | null}
            stage: true, // *; select
            course: true, // *; mentor enters text in input    
        }
    },

    {
        key: "crosscheck",
        template: {
            name: true, // *; mentor enters text in input
            type: true, // *; select
            form: false,
            place: false,
            kind: false, // *; select
            tags: true, // select | input | textarea
            dateTime: true,
            description: true, // mentor enters text in textarea
            descriptionUrl: false, // mentor enters text in input
            eventURL: true,
            deadlinedateTime: true,
            deadlineDescription: false,
            organizer: true, // *; mentor enters text in input; array strings
            duration: false, //? or number
            comment: true,
            isFeedback: false, // *; switcher
            feedback: false,
            materials: false, // {links: string | null, video: string | null, images: string | null}
            stage: true, // *; select
            course: true, // *; mentor enters text in input    
        }
    },

    {
        key: "review",
        template: {
            name: true, // *; mentor enters text in input
            type: true, // *; select
            form: true,
            place: false,
            kind: false, // *; select
            tags: true, // select | input | textarea
            dateTime: true,
            description: true, // mentor enters text in textarea
            descriptionUrl: false, // mentor enters text in input
            eventURL: true,
            deadlinedateTime: false,
            deadlineDescription: false,
            organizer: true, // *; mentor enters text in input; array strings
            duration: true, //? or number
            comment: true,
            isFeedback: false, // *; switcher
            feedback: false,
            materials: false, // {links: string | null, video: string | null, images: string | null}
            stage: true, // *; select
            course: true, // *; mentor enters text in input           
        }
    },

    {
        key:"broadcast live",
        template:{
            name: true, // *; mentor enters text in input
            type: true, // *; select
            form: true,
            place: false,
            kind: false, // *; select
            tags: true, // select | input | textarea
            dateTime: true,
            description: true, // mentor enters text in textarea
            descriptionUrl: false, // mentor enters text in input
            eventURL: true,
            deadlinedateTime: false,
            deadlineDescription: false,
            organizer: true, // *; mentor enters text in input; array strings
            duration: true, //? or number
            comment: true,
            isFeedback: false, // *; switcher
            feedback: false,
            materials: true, // {links: string | null, video: string | null, images: string | null}
            stage: true, // *; select
            course: true, // *; mentor enters text in input           
        }
    },

    {
        key: "self education",
        template:{
            name: true, // *; mentor enters text in input
            type: true, // *; select
            form: false,
            place: false,
            kind: true, // *; select
            tags: true, // select | input | textarea
            dateTime: true,
            description: true, // mentor enters text in textarea
            descriptionUrl: true, // mentor enters text in input
            eventURL: false,
            deadlinedateTime: false,
            deadlineDescription: false,
            organizer: true, // *; mentor enters text in input; array strings
            duration: false, //? or number
            comment: true,
            isFeedback: false, // *; switcher
            feedback: false,
            materials: true, // {links: string | null, video: string | null, images: string | null}
            stage: true, // *; select
            course: true, // *; mentor enters text in input           
        }
    },

    {
        key: "meetup",
        template:{
            name: true, // *; mentor enters text in input
            type: true, // *; select
            form: true, // offline
            place: true,
            kind: false, // *; select
            tags: true, // select | input | textarea
            dateTime: true,
            description: true, // mentor enters text in textarea
            descriptionUrl: true, // mentor enters text in input
            eventURL: true,
            deadlinedateTime: false,
            deadlineDescription: false,
            organizer: true, // *; mentor enters text in input; array strings
            duration: true, //? or number
            comment: true,
            isFeedback: true, // *; switcher
            feedback: false,
            materials: false, // {links: string | null, video: string | null, images: string | null}
            stage: false, // *; select
            course: false, // *; mentor enters text in input           
        }
    },

    {
        key:"interview",
        template:{
            name: true, // *; mentor enters text in input
            type: true, // *; select
            form: false,
            place: false,
            kind: true, // *; select
            tags: true, // select | input | textarea
            dateTime: true,
            description: true, // mentor enters text in textarea
            descriptionUrl: true, // mentor enters text in input
            eventURL: true,
            deadlinedateTime: true,
            deadlineDescription: true,
            organizer: true, // *; mentor enters text in input; array strings
            duration: false, //? or number
            comment: true,
            isFeedback: true, // *; switcher
            feedback: true,
            materials: true, // {links: string | null, video: string | null, images: string | null}
            stage: true, // *; select
            course: true, // *; mentor enters text in input           
        }
    },
    
    {
        key: "presentation",
        template:{
            name: true, // *; mentor enters text in input
            type: true, // *; select
            form: true,
            place: true,
            kind: false, // *; select
            tags: true, // select | input | textarea
            dateTime: true,
            description: true, // mentor enters text in textarea
            descriptionUrl: true, // mentor enters text in input
            eventURL: true,
            deadlinedateTime: false,
            deadlineDescription: false,
            organizer: true, // *; mentor enters text in input; array strings
            duration: false, //? or number
            comment: true,
            isFeedback: false, // *; switcher
            feedback: false,
            materials: true, // {links: string | null, video: string | null, images: string | null}
            stage: true, // *; select
            course: true, // *; mentor enters text in input           
        }
    },
    {
        key:"other",
        template:{
            name: true, // *; mentor enters text in input
            type: true, // *; select
            form: true,
            place: true,
            kind: true, // *; select
            tags: true, // select | input | textarea
            dateTime: true,
            description: true, // mentor enters text in textarea
            descriptionUrl: true, // mentor enters text in input
            eventURL: true,
            deadlinedateTime: true,
            deadlineDescription: true,
            organizer: true, // *; mentor enters text in input; array strings
            duration: true, //? or number
            comment: true,
            isFeedback: true, // *; switcher
            feedback: true,
            materials: true, // {links: string | null, video: string | null, images: string | null}
            stage: true, // *; select
            course: true, // *; mentor enters text in input           
        }
    }
]



// * - must be completed by the mentor  