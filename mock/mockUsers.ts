const UserList = [
    {
        id: '1',
        firstName: 'Karel', 
        lastName: 'Geyer', 
        password: 'password',
        currency: 'CZK',
    },
	{
        id: '2', 
        firstName: 'Jan', 
        lastName: 'Novák', 
        password: 'password2',
        currency: 'EUR',
        coleagues: [
            {
                id: '3', 
                firstName: 'David', 
                lastName: 'Nový', 
                password: 'password3',
                currency: 'CZK'
            },
            {
                id: '4', 
                firstName: 'Petr', 
                lastName: 'Kladivo', 
                password: 'password4',
                currency: 'USD'
            },
        ]
    },
	{
        id: '3', 
        firstName: 'David', 
        lastName: 'Nový', 
        password: 'password3',
        currency: 'CZK'
    },
	{
        id: '4', 
        firstName: 'Petr', 
        lastName: 'Kladivo', 
        password: 'password4',
        currency: 'USD',
        coleagues: [
            {
                id: '7', 
                firstName: 'Dan', 
                lastName: 'Kulov', 
                password: 'password7',
                currency: 'CZK'
            },
            {
                id: '8', 
                firstName: 'Jana', 
                lastName: 'Polní', 
                password: 'password8',
                currency: 'EUR'
            },
        ]
    },
	{
        id: '5', 
        firstName: 'Darek', 
        lastName: 'Stůl', 
        password: 'password5',
        currency: 'CZK',
        coleagues: [
            {
                id: '1',
                firstName: 'Karel', 
                lastName: 'Geyer', 
                password: 'password',
                currency: 'CZK'
            },
        ]
    },
    {
        id: '6', 
        firstName: 'John', 
        lastName: 'Novak', 
        password: 'password6',
        currency: 'USD'
    },
    {
        id: '7', 
        firstName: 'Dan', 
        lastName: 'Kulov', 
        password: 'password7',
        currency: 'CZK'
    },
    {
        id: '8', 
        firstName: 'Jana', 
        lastName: 'Polní', 
        password: 'password8',
        currency: 'EUR'
    },
    {
        id: '9', 
        firstName: 'Hana', 
        lastName: 'Dolní', 
        password: 'password9',
        currency: 'CZK'
    }
];

export default UserList;