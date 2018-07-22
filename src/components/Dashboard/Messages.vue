<template>
        <div class="container">
            <navbar/>
            <navtabs/>
            <hr>
            <div class="main">
                
                <p class="is-size-6">You currently have no messages. When you receive messages from other members, you can click on their photo to see their profile and bio.</p>
            </div>
    
        </div>
    </template>
    <script>
        import Navbar from '@/components/shared/Navbar';
        import Navtabs from '@/components/shared/NavTabs'
        export default {
            name: 'UserMessages',
            data() {
                return {
    
                }
            },
            components: {
                Navbar,
                Navtabs
            }
    
        }
    </script>
    <style scoped>
        .main {
            margin: 50px 0;
        }
    </style>