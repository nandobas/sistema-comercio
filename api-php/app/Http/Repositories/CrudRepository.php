<?php


namespace App\Repositories;

class CrudRepository
{
    protected $classe;

    public function all()
    {
        return $this->classe::all();
    }

    public function index($per_page)
    {
        return $this->classe::paginate($per_page);
    }

    public function allActive($per_page)
    {
        return $this->classe::where('status', true)->paginate($per_page);
    }

    public function store($dados)
    {
        return $this->classe::create($dados);
    }

    public function find($id)
    {
        return $this->classe::find($id);
    }

    public function update(int $id, $dados)
    {
        $recurso = $this->classe::find($id);
        $recurso->fill($dados);
        $recurso->save();

        return $recurso;
    }

    public function destroy($id)
    {
        return $this->classe::destroy($id);
    }

    public function alterStatus(int $id)
    {
        $recurso = $this->classe::find($id);
        $dados['status'] = !$recurso['status'];
        $recurso->fill($dados);
        $recurso->save();

        return $recurso;
    }

    public function orderByName()
    {
        return $this->classe::orderBy('nome')->get();
    }
}
