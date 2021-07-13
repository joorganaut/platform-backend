
import { OnboardingQuestion } from '../../../types'
/*
question: string
    role: 'Member' | 'Partner'
    displayType: QuestionDisplayType
    options?: string[]
    page: number
    pageOrder: number
    enabled: boolean
*/

export const memberQuestions: OnboardingQuestion[] = [
    {
        question: 'avatar',
        role: 'Member',
        displayType: 'file',
        page: 60,
        pageOrder: 0,
        enabled: true,
    },
    {
        question: 'First Name',
        role: 'Member',
        displayType: 'text',
        page: 0,
        pageOrder: 0,
        enabled: true,
        required: true,        
    },
    {
        question: 'Last Name',
        role: 'Member',
        displayType: 'text',
        page: 0,
        pageOrder: 1,
        enabled: true,
        required: true,
    },
    {
        question: 'Gender Identity',
        role: 'Member',
        displayType: 'select',
        options: ['gender'],
        page: 8,
        pageOrder: 3,
        enabled: true,
    },
    {
        question: 'Age Range',
        role: 'Member',
        displayType: 'select',
        options: ['age_range'],
        page: 0,
        pageOrder: 2,
        enabled: true,
        required: true,
    },
    {
        question: 'Location',
        role: 'Member',
        displayType: 'select',
        options:['location'],
        page: 1,
        pageOrder: 0,
        enabled: true,
        required: true,
    },
    {
        question: 'Do You Identify As Being Part Of The Black Community',
        role: 'Member',
        displayType: 'radio-single',
        options: ['Yes: I am part of the community', 'No: I am not part of the community', 'Prefer Not To Say: I am part of the community'],
        page: 2,
        pageOrder: 0,
        enabled: true,
        required: true,
    },
    {
        question: 'Headline',
        role: 'Member',
        displayType: 'text',
        page: 3,
        pageOrder: 0,
        enabled: true,
    },
    {
        question: 'Company Name',
        role: 'Member',
        displayType: 'text',
        page: 3,
        pageOrder: 1,
        enabled: true,
    },
    {
        question: 'Experience Level',
        role: 'Member',
        displayType: 'select',
        options: ['industry_years'],
        page: 4,
        pageOrder: 1,
        enabled: true,
    },
    {
        question: 'Industry',
        role: 'Member',
        displayType: 'select',
        options: ['industry'],
        page: 3,
        pageOrder: 2,
        enabled: true,
    },
    {
        question: 'Area of Expertise',
        role: 'Member',
        displayType: 'select',
        options: ['expertise'],
        page: 4,
        pageOrder: 0,
        enabled: true,
    },
    {
        question: 'Website',
        role: 'Member',
        displayType: 'text',
        page: 5,
        pageOrder: 1,
        enabled: true,
        required: true,
    },
    {
        question: 'Email ',
        role: 'Member',
        displayType: 'text',
        page: 5,
        pageOrder: 1,
        enabled: true,
        required: true,
    },
    {
        question: 'Show Goals',
        role: 'Member',
        displayType: 'yes-no',
        page: 50,
        pageOrder: 0,
        enabled: true,
    },
    {
        question: 'What Do You Want To Accomplish at Obsidi?',
        role: 'Member',
        displayType: 'complex',
        options: [
           'yes-no: Seek Capital/Investment',
          'yes-no: Build my professional network :',
          'yes-no: Find Clients ',
          'yes-no: Find a Job ',
          'yes-no: Hire Talent',
          'yes-no: Find Tech Solutions',
          'yes-no: Belonging, Support or Community',
          'yes-no: Professional Development',
          ],
        page:5,
        pageOrder: 0,
        enabled: true,
    },
    {
        question: 'resume',
        role: 'Member',
        displayType: 'file',
        page: 6,
        pageOrder: 0,
        enabled: true,
    },
]




