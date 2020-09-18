export const templateModalWindow = [
    {
        key: "project",
        template: {
            stage: true, // *; select
            courese: true, // *; mentor enters text in input
            name: true, // *; mentor enters text in input
            subname: true, 
            form: false,
            tags: true, // select | input | textarea
            type: true, // *; select
            step: true, // *; select 'start', 'deadline', 'review', 'other'
            place: false,
            start: true, // *; range picker
            end: true, // *; range picker
            term: true, // *; select; for project task type defolt value = 'long'
            kind: true, // *; select
            comment: true, // mentor enters text in textarea
            descriptionUrl: true, // mentor enters text in input
            materials: true, // {links: string | null, video: string | null, images: string | null}
            descriptionEvent: true, // mentor enters text in textarea
            organizer: true, // *; mentor enters text in input; array strings
            isFeedback: true, // *; switcher
            feedback: true,
            duration: true, //? or number
        }
    },

    {
        key: "broadcast live",
        template: {
            stage: false, // *; select 1 | 2
            courese: true, // *; mentor enters text in input
            name: true, // *; mentor enters text in input
            subname: true,
            form: true, // select; for project task type defolt value = 'online'
            tags: true, // select | input | textarea
            type: true, // *; select
            step: false, // *; select 'start', 'deadline', 'review', 'other'
            place: true, //*;  link mentor enters text in input
            start: true, // *; range picker
            end: false, // *; range picker
            term: true, // *; select; for project task type defolt value = 'short'
            kind: false, // *; select; basic | optional 
            comment: true, // mentor enters text in textarea
            descriptionUrl: true, // mentor enters text in input
            materials: true, // {links: string | null, video: string | null, images: string | null}
            descriptionEvent: true, // mentor enters text in textarea
            organizer: true, // *; mentor enters text in input; array strings
            isFeedback: false, // *; switcher; false | true
            feedback: true, // if isFeedback: true,
            duration: false, //? or number 
        }
    },

    {
        key:"meetup",
        template:{
            stage: false, // *; select 1 | 2
            courese: true, // *; mentor enters text in input
            name: true, // *; mentor enters text in input
            subname: true,
            form: true, // select; for project task type defolt value = 'offline'
            tags: true, // select | input | textarea
            type: true, // *; select
            step: false, // *; select 'start', 'deadline', 'review', 'other'
            place: true, //*;data map | addres | coordinates; ??
            start: true, // *; range picker
            end: false, // *; range picker
            term: true, // *; select; for project task type defolt value = 'short'
            kind: false, // *; select; basic | optional 
            comment: true, // mentor enters text in textarea; link to broadcast mentor enters text
            descriptionUrl: true, // mentor enters text in input
            materials: true, // {links: string | null, video: string | null, images: string | null}
            descriptionEvent: true, // mentor enters text in textarea 
            organizer: true, // *; mentor enters text in input; array strings
            isFeedback: false, // *; switcher; false | true
            feedback: true, // if isFeedback: true,
            duration: true, //? or number
        }
    },

    {
        key:"interview",
        template:{
            stage: true, // *; select 1 | 2
            courese: true, // *; mentor enters text in input
            name: true, // *; mentor enters text in input
            subname: true,
            form: false, // select; online | ofline
            tags: true, // select | input | textarea
            type: true, // *; select
            step: false, // *; select 'start', 'deadline', 'review', 'other'
            place: false, //*;data map | addres | coordinates; ??
            start: true, // *; range picker
            end: true, // *; range picker
            term: true, // *; select; for project task type defolt value = 'long'
            kind: false, // *; select; basic | optional 
            comment: true, // mentor enters text in textarea;
            descriptionUrl: true, // mentor enters text in input
            materials: true, // {links: string | null, video: string | null, images: string | null}
            descriptionEvent: true, // mentor enters text in textarea 
            organizer: true, // *; mentor enters text in input; array strings
            isFeedback: false, // *; switcher; false | true
            feedback: false, // if isFeedback: true,
            duration: false, //? or number
        }
    },

    {
        key:"self education",
        template:{
            stage: true, // *; select
            courese: true, // *; mentor enters text in input
            name: true, // *; mentor enters text in input
            subname: true,
            form: false, // select; online | ofline
            tags: true, // select | input | textarea
            type: true, // *; select
            step: false, // *; select 'start', 'deadline', 'review', 'other'
            place: true,
            start: true, // *; range picker
            end: true, // *; range picker
            term: true, // *; select; for project task type defolt value = 'long'
            kind: true, // *; select
            comment: true, // mentor enters text in textarea
            descriptionUrl: true, // mentor enters text in input
            materials: true, // {links: string | null, video: string | null, images: string | null}
            descriptionEvent: true, // mentor enters text in textarea
            organizer: true, // *; mentor enters text in input; array strings
            isFeedback: false, // *; switcher; false | true
            feedback: false, // if isFeedback: true,
            duration: false, //? or number
        }
    },

    {
        key: "self education",
        template:{
            stage: true, // *; select
            courese: true, // *;
            name: true, // *; mentor enters text in input
            subname: true,
            form: false,
            tags: true, // select | input | textarea
            type: true, // *; select
            step: false, // *; select 'start', 'deadline', 'review', 'other'
            place: false,
            start: true, // *; range picker
            end: true, // *; range picker
            term: true, // *; select; for project task type defolt value = 'short'
            comment: true, // mentor enters text in textarea
            descriptionUrl: false, // mentor enters text in input
            materials: true, // {links: string | null, video: string | null, images: string | null}
            descriptionEvent: true, // mentor enters text in textarea 
            organizer: true, // *; mentor enters text in input; array strings
            isFeedback: false, // *; switcher
            feedback: false,
            duration: false, //? or number  
        }
    },

    {
        key:"new event type",
        template:{
            stage: true, // *; select
            courese: true, // *; mentor enters text in input
            name: true, // *; mentor enters text in input
            subname: true,
            form: true,
            tags: true, // select | input | textarea
            type: true, // *; select
            step: true, // *; select 'start', 'deadline', 'review', 'other'
            place: true,
            start: true, // *; range picker
            end: true, // *; range picker
            term: true, // *; select; for project task type defolt value = 'long'
            kind: true, // *; select
            comment: true, // mentor enters text in textarea
            descriptionUrl: true, // mentor enters text in input
            materials: true, // {links: string | null, video: string | null, images: string | null}
            descriptionEvent: true, // mentor enters text in textarea
            organizer: true, // *; mentor enters text in input; array strings
            isFeedback: true, // *; switcher
            feedback: true,
            duration: true, //? or number  
        }
    }
]



// * - must be completed by the mentor  