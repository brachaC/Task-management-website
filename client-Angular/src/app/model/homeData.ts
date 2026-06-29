export interface IHomeDetails{
    name : string,
    profession : string,
    description : string,
    contactEmail : string,
    techStack: string[],
    meName : string,
    meTitle : string,
    meDescription  : string,
    projectExample : IProjectDetails
}
export interface IProjectDetails{
    title : string,   
    description : string,
    image : string,
    liveLink: string
    githublink: string,
}
