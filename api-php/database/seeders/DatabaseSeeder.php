<?php

namespace Database\Seeders;
use App\Models\User;

use App\Models\Block;
use App\Models\Composition;
use App\Models\BlockComposition;
use App\Models\Portifolio;
use App\Models\PortifolioComposition;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@test.com',
            'password' => Hash::make('admin'),
            'role' => 2
        ]);
        User::create([
            'name' => 'User',
            'email' => 'user@test.com',
            'password' => Hash::make('secret'),
            'role' => 1
        ]);
        User::create([
            'name' => 'Rodnei',
            'email' => 'rodnei@test.com',
            'password' => Hash::make('mypassword'),
            'role' => 1
        ]);

        Block::create([
            'block_name' => 'Saladas',
            'block_state' => 1
        ]);

        //Blocks
        Block::create([
            'block_name' => 'Guarnições',
            'block_state' => 1
        ]);

        Block::create([
            'block_name' => 'Acompanhamento',
            'block_state' => 1
        ]);

        Block::create([
            'block_name' => 'Prato Principal',
            'block_state' => 1
        ]);

        Block::create([
            'block_name' => 'Bebidas',
            'block_state' => 1
        ]);

        //Compositions
        Composition::create([
            'composition_name' => 'Segunda-feira',
            'composition_state' => 1,
            'composition_description' => 'Cardápio da semana - segunda-feira'
        ]);
        Composition::create([
            'composition_name' => 'Terça-feira',
            'composition_state' => 1,
            'composition_description' => 'Cardápio da semana - terça-feira'
        ]);

        Composition::create([
            'composition_name' => 'Quarta-feira',
            'composition_state' => 1,
            'composition_description' => 'Cardápio da semana - quarta-feira'
        ]);

        Composition::create([
            'composition_name' => 'Quinta-feira',
            'composition_state' => 1,
            'composition_description' => 'Cardápio da semana - quinta-feira'
        ]);

        Composition::create([
            'composition_name' => 'Sexta-feira',
            'composition_state' => 1,
            'composition_description' => 'Cardápio da semana - sexta-feira'
        ]);  

        //BlockCompositions
        for($i=1; $i<=5;$i++){            

            for($j=1; $j<=5;$j++){  
                BlockComposition::create([
                    'composition_id' => $i,
                    'block_id' => $j,
                    'block_composition_order' => $j
                ]);
            }
        }

        //Portifolio
        Portifolio::create([
            'portifolio_description' => 'Cardápio Semanal',
            'portifolio_state' => 1
        ]);
        
        //PortifolioComposition
        for($i=1; $i<=5;$i++){   
            PortifolioComposition::create([
                'portifolio_id' => 1,
                'composition_id' => $i,
                'portifolio_composition_order' => $i
            ]);
        } 

    }
}
