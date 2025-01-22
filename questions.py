
file = open('scope_questions.json')
generator = json.loads(file.read())

print(f'Please follow the prompts to generate a scope for your project....')
projectNum = input(f'Enter the project\'s PR number: ')

def printScope(questions):
    for question in questions:
        for answer in question['answers']:
            if answer['selected']:
                if len(answer['scope']) == 0:
                    print(f'\t{answer["prompt"]}')
                else:
                    print(f'\t{answer["scope"]}')

                if "questions" in answer.keys():
                    printScope(answer['questions'])
        if "questions" in question.keys():
            printScope(question['questions'])

def doQuestion(questions):
    for question in questions:
        print(question['name'])
        print(question['prompt'])
        for answer in question['answers']:
            print(f'{question["answers"].index(answer)} - {answer["prompt"]}')
        response = input('Enter the number associated with the response: ')
        question['answers'][int(response)]['selected'] = True

        if "questions" in question['answers'][int(response)].keys():
            if len(question['answers'][int(response)]['questions']) != 0:
                #recursively ask questions as needed
                doQuestion(question['answers'][int(response)]['questions'])
        
        if "questions" in question.keys():
            if len(question['questions']) != 0:
                #recursively ask questions as needed
                doQuestion(question['questions'])

for section in generator['sections']:
    print(f'Section: {section["name"]}')
    doQuestion(section['questions'])

print("Thank you for using the CCS Functional Scope Generator")
print("--------------------------------------------------------")
print("Functional Scope")
print(f'Project Number: {projectNum}')

for section in generator['sections']:
    print(f'Section: {section["name"]}')
    printScope(section['questions'])